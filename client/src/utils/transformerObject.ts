import transformer from "./transformer"

export default (obj: any, elect: any): any => {
  if ( !elect) {
    return obj
  }
  
  obj[elect] = transformer(obj[elect])
  return obj
}
