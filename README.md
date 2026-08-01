# Practice Compass Backup and Restore Protection

Replace only `app.js` and `style.css` in the current stable Practice Compass repository.

## What changed

* Full backup now captures every Practice Compass value stored in the current browser, rather than a limited selection of fields.
* Backups include a creation date and a summary of reflections, timesheet entries, saved hours and supervision items.
* A Restore a backup control has been added under Me, then App tools.
* A selected backup is previewed before restoring.
* Restore requires a second confirmation and clearly explains that browser data will be replaced rather than merged.
* The date of the last full backup is shown on the device.
* Older Practice Compass JSON backups remain importable.

## Protected areas

No Home, Assessment, Reflect, Toolkit or Practice Framework layouts were changed. Existing local storage key names remain unchanged.
