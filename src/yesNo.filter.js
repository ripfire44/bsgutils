import getType from './getType';
export default function () {
    return function (input) {
        if (getType(input) === '[object String]') {
            if (input.length == 0) {
                return null;
            }
            return /^((yes)|(true)|y)$/i.test(input.trim()) ? 'Yes' : 'No';
        }
        return input == null ? null : input ? 'Yes' : 'No';
    };
}
//# sourceMappingURL=yesNo.filter.js.map