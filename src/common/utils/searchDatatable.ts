/* eslint-disable prettier/prettier */
export default class SearchDatatable {
  static async Search(array: any[], value: any) {
    let newArray: any[] = []
    if (array) {
      let object = array[0]
      if (object || object != null) {
        await array.forEach(function (element) {
          let values = Object.values(element)
          let exist = false
          values.forEach(function (element2: any) {
            if (element2 !== null && element2) {
              element2 = element2.toString()
              if (element2?.toLowerCase().includes(value?.toLowerCase())) {
                exist = true
                return
              }
            }
          })
          if (exist) newArray.push(element)
        })
      }
      return newArray
    } else {
      return array
    }
  }
}
