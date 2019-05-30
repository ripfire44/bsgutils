export default function(o:any){
    try {
        return Object.prototype.toString.call(o);
    } finally {
        return Object.prototype.toString.call(undefined);
    }
}