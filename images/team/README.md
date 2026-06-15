# Fotos del staff — United Virtual Airlines

Sube aquí las fotos de cada miembro del staff. El sitio las carga automáticamente
desde esta carpeta. Si una foto no existe todavía, la tarjeta muestra las iniciales
del miembro como respaldo.

## Convención de nombres

Usa el nombre en minúsculas, sin tildes, con guiones entre palabras y extensión `.jpg`:

| Miembro          | Rol            | Archivo                          |
|------------------|----------------|----------------------------------|
| Esteban Ochoa    | CEO / Fundador | `images/team/esteban-ochoa.jpg`   |
| Emiliano Guillén | CO-CEO         | `images/team/emiliano-guillen.jpg`|
| Santiago Martínez| Social Media   | `images/team/santiago-martinez.jpg`|
| Miguel Garza     | Chief of Pilots| `images/team/miguel-garza.jpg`    |
| Ezequiel Cobián  | Training Manager| `images/team/ezequiel-cobian.jpg`|
| Edgar Cepeda     | Fleet Manager  | `images/team/edgar-cepeda.jpg`    |
| (siguiente)      | —              | `images/team/nombre-apellido.jpg` |

## Recomendaciones

- **Formato:** JPG o PNG
- **Tamaño:** cuadrada, mínimo 300×300 px (se recorta en círculo)
- **Peso:** idealmente menos de 300 KB por foto

## Cómo subirla

1. Coloca el archivo en esta carpeta (`images/team/`) con el nombre indicado.
2. Haz commit y push de la imagen al repo.
3. La foto aparecerá automáticamente en la tarjeta correspondiente.

## Estado IVAO en vivo (badges)

Cada tarjeta puede mostrar el estado online/offline del piloto vía IVAO.
El badge se genera con el **VID** del piloto: `https://status.ivao.aero/<VID>.png`

| Miembro          | VID IVAO | Estado     |
|------------------|----------|------------|
| Esteban Ochoa    | 746068   | ✅ activo   |
| Emiliano Guillén | —        | pendiente  |
| Santiago Martínez| —        | pendiente  |
| Miguel Garza     | —        | pendiente  |
| Ezequiel Cobián  | —        | pendiente  |
| Edgar Cepeda     | —        | pendiente  |

Para activar un badge: en `index.html`, dentro de la tarjeta del miembro,
descomenta el bloque `<!-- Estado IVAO ... -->`, sustituye `VID` por el número
real, y elimina el bloque `tcard-tag` anterior.
