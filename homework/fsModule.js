const fs = require('fs')

fs.writeFile(
  'employees.json',
  '{"name": "Employee 1 Name", "salary": 2000}',
  function (err) {
    if (err) throw err
    console.log('employees.json dosyası oluşturuldu')
  }
)

fs.readFile('employees.json', 'utf-8', (err, data) => {
  if (err) console.log(err)
  console.log(`Dosya okundu: ${data}`)
  fs.appendFile(
    'employees.json',
    '\n{"name": "Employee 2 Name", "salary": 3000}',
    function (err) {
      if (err) throw console.log(err)
      console.log(`Dosya güncellendi: ${data}`)
      console.log('5 saniye sonra dosya silinecek')
      setTimeout(() => {
        fs.unlink('employees.json', (err) => {
          if (err) console.log(err)
          console.log('Dosya silindi.')
        })
      }, 5000)
    }
  )
})
