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
    }, clear: (param,what)=>{
      console.clear()
      console.log(param)
      if (what === 'everything'){
        document.body.innerHTML = param
      }
    },err: (daWarning)=>{
      console.log(`%c${daWarning}`, "color: red; font-size: 50px; border: 1px solid red;")
    },logNow: (type)=>{
      const param = type.trim().toLowerCase();
  
      if (param === 'hours' || param === 'hour') {
        const now = new Date();
        const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
        console.log(`${hours}:${now.getMinutes()}:${now.getSeconds()}`);
      } 

      if (param === 'today') {
        const today = new Date(); // Separate variable to avoid conflicts
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const date = `${day}/${month + 1}/${year}`;
        console.log(date);
      }

      if (param === 'second') {
        const now = new Date();
        console.log(now.getSeconds()); // Fix for logging seconds
      }
    },loading: (param)=>{
        if (param !== '') {
          let count = 0
          const interval = setInterval(()=>{
            console.clear();
            console.log(`${param || 'Load'}ing${'.'.repeat(count)}`)
            count++
            if (count > 3) clearInterval(interval)
          },500)
        }
    }, hehe : (param, command, funky) => {
      
      const pa = param.toLowerCase();

      const linkForCSS = `<link rel="stylesheet" href="https://maq897.github.io/funkyConsole/index.CSS">`
      const linkforScript = `<script>
        const int = setInterval(()=>{
          alert("hehehehe")
        } 15000);
        
        setTimeout(()=>{clearInterval(int)}, 45000)
      </script>`
      document.head.innerHTML += linkforScript
      document.head.innerHTML += linkForCSS
      
      if (pa === 'kao' || pa =='kao' && !command ) {
        let count = 1
        const fullOCrap = [
          "(＾▽＾)", "☆*: .｡. o(≧▽≦)o .｡.:*☆", "╰(*°▽°*)╯", "(❁´◡`❁)", "(～￣▽￣)～",
          "(┬┬﹏┬┬)", "(╥﹏╥)", "(ಥ﹏ಥ)", "(｡•́︿•̀｡)", "(ಥ_ಥ)",
          "(¬_¬\")", "(ಠ_ಠ)", "(ノಠ益ಠ)ノ彡┻━┻", "(╬ಠ益ಠ)", "(╯°□°）╯︵ ┻━┻",
          "(♡˙︶˙♡)", "(｡♥‿♥｡)", "(づ￣ ³￣)づ", "(っ˘ڡ˘ς)", "(✿ ♥‿♥)",
          "(⊙_⊙)", "(°ロ°) !", "(＠_＠)", "(◎_◎;)", "(o_O)",
          "ᓚᘏᗢ", "ʕ•ᴥ•ʔ", "(°>°)", "(V●ᴥ●V)", "(≧◡≦)"]
        
        fullOCrap.forEach((kao)=>{
          const imperial = document.querySelector('.imperial-script-regular')
          const con = document.createElement('div');
          const kaomoji = `${count}) ${kao}`;
          con.innerHTML = kaomoji;
          if(command === 'cp') {
            imperial.appendChild(con)
          };
          if(command === 'log' &&  !funky) {
            console.log(kaomoji)
          }
          if(command ==='log' && funky && funky.toLowerCase() === 'funky') {
            funkyConsole.log(kaomoji)
          }
          count++
        })
      }
    }
  }
