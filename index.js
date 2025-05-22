const funkyConsole = {
    log: (param,color1,color2)=>{
      for(c of param) {
        if (color1 && color2 !== '') {
          console.log(`%c${c}   ${c}`, `color:${color1}`)
          console.log(`%c  ${c}`, `color:${color2}`)
        } else {
          console.log(`${c}   ${c}`)
          console.log(`  ${c}`)
        }
      }
    },
    clear: (param)=>{
      console.clear()
      console.log(param)
    },
    err: (daWarning)=>{
      console.log(`%c${daWarning}`, "color: red; font-size: 50px; border: 1px solid red;")
    },

  }
