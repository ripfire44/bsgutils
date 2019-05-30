import * as angular from 'angular';

function YesNoFilter (): Function {
    return function(input:any){
        
        if(angular.isString(input)){
            if(input.length==0){
                return null;
            }
            return /^((yes)|(true)|y)$/i.test(input.trim()) ? 'Yes' : 'No';
        }
        return input == null ? null : input ? 'Yes' : 'No';
    }
}
// inject ng dependencies here
export default YesNoFilter;