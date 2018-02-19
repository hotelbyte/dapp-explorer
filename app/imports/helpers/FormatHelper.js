
import BigNumber from 'bignumber.js'

/**
 Formats a given number
 formatNumber(10000, "0.0[000]")
 @method formatNumber
 @param {Number|String|BigNumber} number the number to format
 @param {String} format the format string e.g. "0,0.0[000]" see http://numeraljs.com for more.
 @return {String} The formated time
 **/
export function FormatNumber(number, format){
    var length = 0;
    var optionalLength = 0;

    if(!_.isFinite(number) && !(number instanceof BigNumber))
        number = 0;

    if(format instanceof Spacebars.kw)
        format = null;

    if(_.isString(number))
        number = new BigNumber(number, 10);
    if(_.isFinite(number) && !_.isObject(number))
        number = new BigNumber(number);

    var options = (getLang() === 'en')
        ?   { decimalSeparator: '.',
            groupSeparator: ',',
            groupSize: 3
        }
        :   { decimalSeparator: ',',
            groupSeparator: '.',
            groupSize: 3
        };
    BigNumber.config({ FORMAT: options });


    // get segment positions (0,0. | 0 | [0])
    if(format && ~format.indexOf('.')) {
        var decimalPos = format.indexOf('.');
        if(~format.indexOf('[')) {
            length = format.substr(decimalPos, format.indexOf('[') - decimalPos).replace(/[\.\[\]]/g,'').length;
            optionalLength = format.substr(format.indexOf('[')).replace(/[\[\]]/g,'').length;
        } else {
            length = format.substr(decimalPos).replace(/[\.\[\]]/g,'').length;
            optionalLength = 0;
        }
    }
    var fullLength = length + optionalLength;
    number = number.toFormat(fullLength ? fullLength : undefined);

    // if segements are detected, rebuild the number string
    if(fullLength) {
        var beforeDecimal = number.substr(0, number.indexOf(options.decimalSeparator) + 1);
        var afterDecimal = number.replace(beforeDecimal, '').substr(0, length);
        var afterDecimalOptional = number.replace(beforeDecimal, '').substr(length, optionalLength).replace(/0*$/,'');
        beforeDecimal = beforeDecimal.replace(options.decimalSeparator, '');

        return (!afterDecimal && !afterDecimalOptional)
            ? beforeDecimal
            : beforeDecimal + options.decimalSeparator + afterDecimal + afterDecimalOptional;

        // otherwise simply return the formated number
    } else {
        return number;
    }
}

function getLang () {
    return (
        navigator.languages && navigator.languages[0] ||
        navigator.language ||
        navigator.browserLanguage ||
        navigator.userLanguage ||
        'en'
    );
}