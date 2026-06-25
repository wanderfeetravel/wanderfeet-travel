# Captura de consultas en Google Sheets

Esta guía deja lista una mini base de datos en Google Sheets para guardar consultas enviadas desde los formularios de WanderFeet Travel & Visa.

## 1. Crear la hoja

1. Entra a Google Drive.
2. Crea una hoja nueva llamada `WanderFeet Consultas`.
3. Copia el ID de la hoja desde la URL. Es el texto largo entre `/d/` y `/edit`.

Ejemplo:

```text
https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
```

## 2. Crear Apps Script

1. En la hoja, ve a `Extensiones` > `Apps Script`.
2. Borra el contenido inicial.
3. Pega este código.
4. Cambia `SPREADSHEET_ID` por el ID real de tu hoja.

```javascript
const SPREADSHEET_ID = 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEET';
const SHEET_NAME = 'Consultas';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getSheet_();
    const fields = payload.fields || {};

    sheet.appendRow([
      new Date(),
      payload.form || '',
      payload.page || '',
      payload.path || '',
      fields.c_name || fields.q_name || fields.h_name || fields.p_name || '',
      fields.c_phone || fields.q_phone || fields.h_phone || fields.p_phone || '',
      fields.c_service || fields.q_interest || fields.h_travel_type || fields.p_style || '',
      fields.q_origin || '',
      fields.q_dest || fields.h_dest || fields.p_destination || '',
      fields.q_depart || fields.h_checkin || fields.p_depart || '',
      fields.q_return || fields.h_checkout || '',
      fields.q_pax || fields.h_guests || fields.p_travelers || '',
      fields.q_budget || fields.h_budget || fields.p_budget || '',
      fields.p_includes || '',
      fields.c_msg || fields.q_notes || fields.h_notes || fields.p_notes || '',
      payload.user_agent || ''
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true, service: 'WanderFeet lead capture' });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Fecha',
      'Formulario',
      'Página',
      'Ruta',
      'Nombre',
      'WhatsApp',
      'Servicio / Tipo',
      'Origen',
      'Destino',
      'Fecha salida / entrada',
      'Fecha regreso / salida',
      'Viajeros',
      'Presupuesto',
      'Servicios incluidos',
      'Mensaje / Notas',
      'Navegador'
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publicar como aplicación web

1. Haz clic en `Implementar` > `Nueva implementación`.
2. Tipo: `Aplicación web`.
3. Ejecutar como: `Yo`.
4. Quién tiene acceso: `Cualquier persona`.
5. Haz clic en `Implementar`.
6. Autoriza los permisos.
7. Copia la URL de la aplicación web.

La URL debe verse parecida a:

```text
https://script.google.com/macros/s/AKfycb.../exec
```

## 4. Activar en la web

En `assets/js/main.js`, reemplaza:

```javascript
const WF_LEAD_ENDPOINT = '';
```

por:

```javascript
const WF_LEAD_ENDPOINT = 'https://script.google.com/macros/s/TU_URL_PUBLICADA/exec';
```

Después de publicar el cambio, cada formulario seguirá abriendo WhatsApp y además guardará una copia de la consulta en Google Sheets.

## Seguridad

- No pongas claves privadas en el sitio web.
- La hoja queda en tu Google Drive.
- El sitio no procesa pagos.
- El endpoint solo recibe los campos enviados por los formularios.
- Si cambias permisos de la hoja o del script, prueba nuevamente antes de usarlo con clientes.
