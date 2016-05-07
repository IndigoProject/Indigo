module.exports = function(str_a, str_b){
    if(str_a.length === 0) return str_b.length;
    if(str_b.length === 0) return str_a.length;

    var matrix = [];

    var i;
    for(i = 0; i <= str_b.length; i++){
        matrix[i] = [i];
    }

    var j;
    for(j = 0; j <= str_a.length; j++){
        matrix[0][j] = j;
    }

    for(i = 1; i <= str_b.length; i++){
        for(j = 1; j <= str_a.length; j++){
            if(str_b.charAt(i-1) == str_a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, Math.min(matrix[i][j-1] + 1, matrix[i-1][j] + 1));
            }
        }
    }

    return matrix[str_b.length][str_a.length];
};
