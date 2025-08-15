const configuraciones = {
      "Institución 1": {
        periodos: ["Periodo 1", "Periodo 2", "Periodo 3"],
        bloques: [
          {
            nombre: "Cognitivo",
            subCols: ["P1", "P2", "P3"],
            calculo: "promedio",
          },
          {
            nombre: "Procedimental",
            subCols: ["P1", "P2", "P3"],
            calculo: "promedio",
          },
          {
            nombre: "Coevaluación",
            subCols: ["P1", "P2"],
            calculo: "promedio",
          },
        ],
      },
      "Institución 2": {
        periodos: ["Periodo Único"],
        bloques: [
          {
            nombre: "Periodo",
            subCols: ["P1", "P2", "P3", "P4"],
            calculo: "promedio",
          },
        ],
      },
      "Institución 3": {
        periodos: ["Periodo 1", "Periodo 2"],
        bloques: [
          {
            nombre: "Única",
            subCols: ["P1", "P2", "P3", "P4"],
            calculo: "promedio",
          },
        ],
      },
    };

    const estudiantes = {
      "Institución 1": {
        "8-1": [
          "Juan Pérez",
          "María Gómez",
          "Andrés Torres",
          "Laura Martínez",
        ],
        "8-2": ["Pedro Rojas", "Ana Fernández"],
      },
      "Institución 2": {
        "7-1": ["Luis Castillo", "Carmen Díaz"],
        "7-2": ["Miguel López", "Daniela Ruiz"],
      },
      "Institución 3": {
        "9-1": ["Sofía Herrera", "Mateo García"],
      },
    };

    let datosGuardados = {};
    let metasGuardadas = {};
    let configuracionesGuardadas = {};
    let hot = null;
    let changeHistory = [];

    const contenedor = document.getElementById("tabla");
    const instSelect = document.getElementById("institucion");
    const grupoSelect = document.getElementById("grupo");
    const periodoSelect = document.getElementById("periodo");
    const metaInput = document.getElementById("metaInput");
    const addColumnButtons = document.getElementById("addColumnButtons");
    const changeHistoryContainer = document.getElementById("changeHistory");

    // Función para clonar objetos
    function clonarConfiguracion(config) {
      return JSON.parse(JSON.stringify(config));
    }

    // Obtener configuración para una combinación inst/grupo/periodo
    function obtenerConfiguracion(inst, grupo, periodo) {
      configuracionesGuardadas[inst] = configuracionesGuardadas[inst] || {};
      configuracionesGuardadas[inst][grupo] =
        configuracionesGuardadas[inst][grupo] || {};

      if (!configuracionesGuardadas[inst][grupo][periodo]) {
        // Clonar la configuración base
        configuracionesGuardadas[inst][grupo][periodo] = clonarConfiguracion(
          configuraciones[inst]
        );
      }

      return configuracionesGuardadas[inst][grupo][periodo];
    }

    // Inicializar select de instituciones
    Object.keys(configuraciones).forEach((inst) => {
      const opt = document.createElement("option");
      opt.value = inst;
      opt.textContent = inst;
      instSelect.appendChild(opt);
    });

    function actualizarGrupos() {
      grupoSelect.innerHTML = "";
      const inst = instSelect.value;
      Object.keys(estudiantes[inst]).forEach((gr) => {
        const opt = document.createElement("option");
        opt.value = gr;
        opt.textContent = gr;
        grupoSelect.appendChild(opt);
      });
    }

    function actualizarPeriodos() {
      periodoSelect.innerHTML = "";
      const inst = instSelect.value;
      configuraciones[inst].periodos.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        periodoSelect.appendChild(opt);
      });
    }

    function crearPlantillaFila(config, nombreEstudiante) {
      const fila = [nombreEstudiante];
      config.bloques.forEach((b) => {
        b.subCols.forEach(() => fila.push(false));
        fila.push(0);
      });
      return fila;
    }

    function generarColumnasYHeaders(config) {
      const columns = [
        {
          type: "text",
          readOnly: true,
          className: "htMiddle",
          renderer: function (instance, td, row, col, prop, value) {
            // Renderizado personalizado para la columna de estudiantes
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.fontWeight = "600";
            td.style.color = "#1a237e";
            td.style.background = "#f5f7ff";
          },
        },
      ];

      const headerFila1 = [{ label: "", rowspan: 1 }];

      const headerFila2 = ["Estudiantes"];

      config.bloques.forEach((b) => {
        headerFila1.push({
          label: b.nombre,
          colspan: b.subCols.length + 1,
          className: "bloque-header"
        });
        b.subCols.forEach((sub) => headerFila2.push(sub));
        headerFila2.push("Nota");

        // Añadir columnas para checkboxes y nota
        b.subCols.forEach(() =>
          columns.push({ type: "checkbox", className: "htCenter" })
        );
        columns.push({
          type: "numeric",
          readOnly: true,
          numericFormat: { pattern: "0.00" },
          className: "htCenter",
          renderer: function (instance, td, row, col, prop, value) {
            // Renderizado personalizado para las notas
            Handsontable.renderers.NumericRenderer.apply(this, arguments);

            // Resaltar notas según su valor
            if (value >= 4) td.style.background = "#e8f5e9";
            else if (value >= 3) td.style.background = "#fff8e1";
            else if (value > 0) td.style.background = "#ffebee";
          },
        });
      });

      return { columns, nestedHeaders: [headerFila1, headerFila2] };
    }

    function recalcularNotas(config) {
      if (!hot) return;
      const filas = hot.countRows();

      // Ahora empezamos desde la columna 1
      for (let r = 0; r < filas; r++) {
        let col = 1;
        config.bloques.forEach((b) => {
          const checks = [];
          for (let i = 0; i < b.subCols.length; i++) {
            const val = hot.getDataAtCell(r, col + i);
            checks.push(val === true || val === "true" || val === 1);
          }
          let nota = 0;
          if (b.calculo === "suma") {
            nota = checks.reduce((acc, v) => acc + (v ? 5 : 0), 0);
          } else if (b.calculo === "maximo" || b.calculo === "máximo") {
            const valores = checks.map((v) => (v ? 5 : 0));
            nota = valores.length ? Math.max(...valores) : 0;
          } else {
            const total = checks.filter(Boolean).length;
            nota = b.subCols.length ? (total / b.subCols.length) * 5 : 0;
          }
          hot.setDataAtCell(
            r,
            col + b.subCols.length,
            parseFloat(nota.toFixed(2)),
            "calc"
          );
          col += b.subCols.length + 1;
        });
      }
    }

    function guardarDatos(inst, grupo, periodo) {
      datosGuardados[inst] = datosGuardados[inst] || {};
      datosGuardados[inst][grupo] = datosGuardados[inst][grupo] || {};
      datosGuardados[inst][grupo][periodo] = hot.getData();
    }

    function cargarDatos(inst, grupo, periodo, config) {
      if (
        datosGuardados[inst] &&
        datosGuardados[inst][grupo] &&
        datosGuardados[inst][grupo][periodo]
      ) {
        return datosGuardados[inst][grupo][periodo];
      } else {
        return estudiantes[inst][grupo].map((nombre) =>
          crearPlantillaFila(config, nombre)
        );
      }
    }

    function guardarMeta(inst, grupo, periodo) {
      metasGuardadas[inst] = metasGuardadas[inst] || {};
      metasGuardadas[inst][grupo] = metasGuardadas[inst][grupo] || {};
      metasGuardadas[inst][grupo][periodo] = metaInput.value;
    }

    function cargarMeta(inst, grupo, periodo) {
      if (
        metasGuardadas[inst] &&
        metasGuardadas[inst][grupo] &&
        metasGuardadas[inst][grupo][periodo]
      ) {
        return metasGuardadas[inst][grupo][periodo];
      } else {
        return "";
      }
    }
    
    // Función para registrar cambios en el historial
    function registrarCambio(accion, bloque) {
      const timestamp = new Date().toLocaleTimeString();
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <i class="fas fa-${accion === 'add' ? 'plus-circle' : 'minus-circle'}"></i>
        ${accion === 'add' ? 'Agregada' : 'Eliminada'} columna en ${bloque} (${timestamp})
      `;
      changeHistoryContainer.prepend(historyItem);
      
      // Mantener solo los últimos 5 elementos
      if (changeHistoryContainer.children.length > 5) {
        changeHistoryContainer.removeChild(changeHistoryContainer.lastChild);
      }
    }

    function agregarColumnaABloque(inst, grupo, periodo, bloqueIndex) {
      const config = obtenerConfiguracion(inst, grupo, periodo);
      const bloque = config.bloques[bloqueIndex];

      // Determinar el próximo número
      const nextNum = bloque.subCols.length + 1;
      const nuevaCol = `P${nextNum}`;
      bloque.subCols.push(nuevaCol);

      // Registrar cambio
      registrarCambio('add', bloque.nombre);

      // Actualizar los datos guardados para agregar la nueva columna en cada fila
      if (
        datosGuardados[inst] &&
        datosGuardados[inst][grupo] &&
        datosGuardados[inst][grupo][periodo]
      ) {
        const data = datosGuardados[inst][grupo][periodo];

        // Calcular la posición donde insertar
        let startCol = 1; // después del nombre
        for (let i = 0; i < bloqueIndex; i++) {
          startCol += config.bloques[i].subCols.length + 1;
        }

        // Insertar en cada fila un false en la posición correcta
        datosGuardados[inst][grupo][periodo] = data.map((fila) => {
          const newFila = [...fila];
          newFila.splice(startCol + bloque.subCols.length - 1, 0, false);
          return newFila;
        });
      }

      // Volver a renderizar la tabla
      renderTabla();
    }
    
    function eliminarUltimaColumnaBloque(inst, grupo, periodo, bloqueIndex) {
      const config = obtenerConfiguracion(inst, grupo, periodo);
      const bloque = config.bloques[bloqueIndex];
      
      // Verificar si hay columnas para eliminar
      if (bloque.subCols.length <= 1) {
        alert(`No se puede eliminar más columnas del bloque ${bloque.nombre}. Debe tener al menos una columna.`);
        return;
      }
      
      // Eliminar la última columna
      const columnaEliminada = bloque.subCols.pop();
      
      // Registrar cambio
      registrarCambio('remove', bloque.nombre);

      // Actualizar los datos guardados
      if (
        datosGuardados[inst] &&
        datosGuardados[inst][grupo] &&
        datosGuardados[inst][grupo][periodo]
      ) {
        const data = datosGuardados[inst][grupo][periodo];

        // Calcular la posición donde eliminar
        let startCol = 1; // después del nombre
        for (let i = 0; i < bloqueIndex; i++) {
          startCol += config.bloques[i].subCols.length + 1;
        }
        
        // La posición de la última columna del bloque
        const colIndex = startCol + bloque.subCols.length;

        // Eliminar en cada fila la columna en la posición correcta
        datosGuardados[inst][grupo][periodo] = data.map((fila) => {
          const newFila = [...fila];
          newFila.splice(colIndex, 1); // Eliminar la columna
          return newFila;
        });
      }

      // Volver a renderizar la tabla
      renderTabla();
    }

    function crearBotonesAgregarColumnas(inst, grupo, periodo) {
      const config = obtenerConfiguracion(inst, grupo, periodo);
      addColumnButtons.innerHTML = "";

      config.bloques.forEach((bloque, index) => {
        const container = document.createElement('div');
        container.className = 'column-management';
        
        const title = document.createElement('div');
        title.className = 'column-title';
        title.innerHTML = `<i class="fas fa-layer-group"></i> ${bloque.nombre}`;
        
        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '10px';
        buttonsRow.style.width = '100%';
        
        const btnAgregar = document.createElement("button");
        btnAgregar.className = "btn-agregar";
        btnAgregar.textContent = "Agregar";
        btnAgregar.dataset.bloque = index;
        
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn-eliminar";
        btnEliminar.textContent = "Eliminar última";
        btnEliminar.dataset.bloque = index;
        
        // Deshabilitar botón de eliminar si solo hay una columna
        if (bloque.subCols.length <= 1) {
          btnEliminar.disabled = true;
          btnEliminar.style.opacity = "0.6";
          btnEliminar.style.cursor = "not-allowed";
        }
        
        buttonsRow.appendChild(btnAgregar);
        buttonsRow.appendChild(btnEliminar);
        
        container.appendChild(title);
        container.appendChild(buttonsRow);
        addColumnButtons.appendChild(container);
      });
    }

    function renderTabla() {
      const inst = instSelect.value;
      const grupo = grupoSelect.value;
      const periodo = periodoSelect.value;
      const config = obtenerConfiguracion(inst, grupo, periodo);

      const data = cargarDatos(inst, grupo, periodo, config);
      const { columns, nestedHeaders } = generarColumnasYHeaders(config);

      // Cargar la meta de aprendizaje para este grupo
      metaInput.value = cargarMeta(inst, grupo, periodo);

      // Crear botones para añadir columnas
      crearBotonesAgregarColumnas(inst, grupo, periodo);

      if (hot) {
        hot.destroy();
        hot = null;
      }

      // Configuración corregida de Handsontable
      hot = new Handsontable(contenedor, {
        data,
        columns,
        nestedHeaders,
        rowHeaders: true,
        colHeaders: false,
        licenseKey: "non-commercial-and-evaluation",
        height: 'auto',
        manualRowResize: true,
        manualColumnResize: true,
        contextMenu: true,
        filters: false,
        dropdownMenu: false,
        columnSorting: true,
        autoWrapRow: true,
        autoWrapCol: true,
        stretchH: "all",
        className: "htCenter htMiddle",
        // Configuraciones adicionales para mejorar rendimiento
        renderAllRows: false,
        viewportRowRenderingOffset: 'auto',
        viewportColumnRenderingOffset: 'auto',
        // Mejorar experiencia táctil
        outsideClickDeselects: false,
        selectionMode: 'single'
      });

      // Configurar eventos
      hot.addHook('afterChange', (changes, source) => {
        if (source && source === "calc") return;
        if (changes) {
          recalcularNotas(config);
          guardarDatos(inst, grupo, periodo);
        }
      });

      recalcularNotas(config);
    }

    // Guardar la meta cuando se modifica
    metaInput.addEventListener("input", function () {
      const inst = instSelect.value;
      const grupo = grupoSelect.value;
      const periodo = periodoSelect.value;

      if (inst && grupo && periodo) {
        guardarMeta(inst, grupo, periodo);
      }
    });

    // Evento delegado para los botones de agregar y eliminar columna
    addColumnButtons.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("btn-agregar")) {
        const bloqueIndex = parseInt(e.target.dataset.bloque);
        const inst = instSelect.value;
        const grupo = grupoSelect.value;
        const periodo = periodoSelect.value;
        agregarColumnaABloque(inst, grupo, periodo, bloqueIndex);
      }
      
      if (e.target && e.target.classList.contains("btn-eliminar")) {
        const bloqueIndex = parseInt(e.target.dataset.bloque);
        const inst = instSelect.value;
        const grupo = grupoSelect.value;
        const periodo = periodoSelect.value;
        eliminarUltimaColumnaBloque(inst, grupo, periodo, bloqueIndex);
      }
    });

    // Eventos de cambio
    instSelect.addEventListener("change", () => {
      actualizarGrupos();
      actualizarPeriodos();
      renderTabla();
    });

    grupoSelect.addEventListener("change", renderTabla);
    periodoSelect.addEventListener("change", renderTabla);

    // Inicialización al cargar
    instSelect.value = Object.keys(configuraciones)[0];
    actualizarGrupos();
    actualizarPeriodos();
    renderTabla();