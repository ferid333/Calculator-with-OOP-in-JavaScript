const clearAll_button = document.querySelector(".clearAll_button")
const equal = document.querySelector(".equal")
const delete_button = document.querySelector(".delete")
const numbers=document.querySelectorAll(".number")
const elements=document.querySelectorAll(".element")
const prev=document.querySelector(".prev")
const curr=document.querySelector(".cur")
const minus=document.querySelector(".minus")
const operations=document.querySelectorAll(".operation")

let empty="0"
let empty_prev=""


class Claculation {

  constructor(){
    this.result=0
    this.operation_done=false
    this.prev_operation=""
    this.after_operation=""
    this.number1=0
    this.number2=0
    this.c_operation=null
  }

  sqrt(numc){
    this.result=numc*numc
    this.clear_prev()
    prev.append(`sqr(${this.after_operation ? this.after_operation :  numc})`)
    this.operation_done=true
    return this.result
  }
  division_one(numc){
    this.result=1/numc
    this.clear_prev()
    prev.append(`1/(${this.after_operation ? this.after_operation :  numc})`)
    this.operation_done=true
    return this.result
  }
  extract(numc){
    this.result=Math.sqrt(numc)
    this.clear_prev()
    prev.append(`√(${this.after_operation ? this.after_operation :  numc})`)
    this.operation_done=true
    return this.result
  }
  calculate_numbers(numc,nump){
    console.log(numc,nump)
    switch (this.c_operation) {
      case "+":
        this.result=numc + nump
        break;
      case "-":
        this.result=numc - nump
        break;
      case "x":
        this.result=numc * nump
        break;
        case "÷":
          this.result=numc / nump
          break;                  
      default:
        this.result=parseFloat(curr.textContent)
        break;
    }
    return this.result
  }
  clear_prev(){
    if(empty_prev==prev.textContent){ prev.textContent="",this.operation_done=false,this.c_operation=null}
    this.prev_operation=this.c_operation ? prev.textContent.split(this.c_operation)[0]  : this.operation_done ? prev.textContent : ""
    this.after_operation= this.c_operation ? prev.textContent.split(this.c_operation)[1]  : this.operation_done ? prev.textContent : ""
    prev.textContent= this.c_operation ? prev.textContent.substring(0, prev.textContent.indexOf(this.c_operation)+1) : ""
  }
}


class Main extends Claculation{

  constructor(){
    super()
    curr.textContent=empty
  }
  
addNumber(num){
  if(this.operation_done) curr.textContent=""
  if(curr.textContent.length<15){
    parseFloat(curr.textContent)==0 && !curr.textContent.includes(".") ? curr.textContent= curr.textContent.substring(1)+ num :  curr.append(num)
    this.operation_done=false
  }
  
}
addElement(element) {
  if (curr.textContent.includes(element)) return;
  curr.append(element)
}
addMinus(){
  if(this.operation_done) {
    this.clear_prev()
    prev.append(`negate(${this.after_operation ? this.after_operation : curr.textContent})`)
  }
  let number_current = parseFloat(curr.textContent)*-1 ? parseFloat(curr.textContent)*-1 : curr.textContent
  curr.textContent= curr.textContent.substring(curr.textContent.length-1)=="." && number_current==curr.textContent.split(".")[0] ? "." : ""
  curr.prepend(number_current)
  !this.c_operation ? this.number1=number_current: this.number2=number_current
}
clearAll(){
  prev.textContent=""
  curr.textContent="0"
}
calculate(operation){
let numc=parseFloat(curr.textContent)
let nump=parseFloat(prev.textContent)
switch (operation) {
  case "^": 
  curr.textContent=this.sqrt(numc)
    break;
  case "1/x":
    curr.textContent=this.division_one(numc)
    break;
  case "√":
    curr.textContent=this.extract(numc)
    break;
  case "+":
    this.clear_prev()
    this.check_operation(operation)
    this.c_operation=operation
    this.operation_done=true
    break;
  case "-":
    this.clear_prev()
    this.check_operation(operation)
    this.c_operation=operation
    this.operation_done=true
    break;
  case "x":
    this.clear_prev()
    this.check_operation(operation)
    this.c_operation=operation
    this.operation_done=true
    break;
  case "÷":
    this.clear_prev()
    this.check_operation(operation)
    this.c_operation=operation
    this.operation_done=true
    break;

    case "=":
    if(prev.textContent.includes("=")){
      this.number1=numc
      
      this.c_operation ? prev.textContent=prev.textContent.substring(prev.textContent.indexOf(this.c_operation), prev.textContent.length) : prev.textContent=" ="
      prev.prepend(numc)
    }
    else{
      this.clear_prev()
      this.operation_done=true
      this.number1=this.convertor(this.prev_operation.trim())
      if(!this.after_operation){
        this.number2=numc
      }
      else{
        this.number2=this.convertor(this.after_operation.trim())
      }
      prev.append(` ${this.after_operation ? this.after_operation : numc} =`)
    }
    curr.textContent=this.sum_number(this.number1,this.number2)
    empty_prev=prev.textContent
    break;  
  default:
    break;
}

}
delete(){
    curr.textContent=curr.textContent.slice(0,-1)
    if (!curr.textContent) curr.textContent=empty
}

convertor(pattern){
  let str=pattern.split("(")
  let num=str[str.length-1].split(")")[0]
  let functions=str.slice(0,str.length-1)

  for (let i = 0;i < functions.length;i++) {
     if(functions[i]=="sqr"){
      num=num*num
     }
    else if(functions[i]=="√"){
      num=Math.sqrt(num)
     }
    else if(functions[i]=="1/"){
      num=1/num
     }
    else if(functions[i]=="negate"){
      num=-1*num
     }
  }
  return parseFloat(num)
}

check_operation(operation){
  let numc=parseFloat(curr.textContent)
  let prev_operation= prev.textContent.split(this.c_operation)[0].trim()
  let num_prev=this.convertor(prev_operation)
  if(numc!=num_prev && this.c_operation && !prev.textContent.includes("=") && prev.textContent){
    this.calculate("=")
    prev.textContent=`${this.result} ${operation}`
  }
  else{
    if (!this.c_operation) {
      if (!this.operation_done) {
        prev.append(`${numc} ${operation}`);
      }
      else{
        prev.append(`${this.prev_operation} ${operation}`)
      }
    }
    else{
      prev.textContent=prev.textContent.slice(0,-1)
      prev.append(`${operation}`)
    }
  }

}

}

class Click extends Main{
  
 constructor(){
  super()
  this.buttons={c:[clearAll_button,super.clearAll],d:[delete_button,super.delete],n:[numbers,super.addNumber],e:[elements,super.addElement],m:[minus,super.addMinus],o:[operations,super.calculate]}
  this.operation_smbols=["+","-","*","/"]
  window.addEventListener("keypress",(e)=>{e.key <10 && e.key >0 ? this.buttons["n"][1](e.key) : e.key =="." ? this.buttons["e"][1](e.key) : this.operation_smbols.includes(e.key) ? this.buttons["o"][1](e.key): null})

  for (let k in this.buttons) {
    if (k=="n" || k=="e" || k=="o"){
      this.buttons[k][0].forEach(item=>{
        item.addEventListener("click", this.buttons[k][1].bind(this,item.textContent))
      })
    }
    else{
      this.buttons[k][0].addEventListener("click", this.buttons[k][1].bind(this))
    }
   }

 }

}

const click = new Click()

