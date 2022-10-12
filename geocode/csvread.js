function uploadDealcsv () {}; 

var locations = []

uploadDealcsv.prototype.getCsv = function(e) {
       
    let input = document.getElementById('upload');
    input.addEventListener('change', function() {

      if (this.files && this.files[0]) {

          var myFile = this.files[0];
          var reader = new FileReader();
          
          reader.addEventListener('load', function (e) {
              
              let csvdata = e.target.result; 
              parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
          });
          
          reader.readAsBinaryString(myFile);
      }
    });
  }


    /*------- Method for parse csv data and display --------------*/
    uploadDealcsv.prototype.getParsecsvdata = function(data) {

        //let parsedata = [];

        let newLinebrk = data.split("\n");
        for(let i = 0; i < newLinebrk.length; i++) {
            locations.push(newLinebrk[i].split("\r\n")[0].slice(1, -2))
        }

        /*
        for ( let i = 0; i < parsedata.length; i++){
            matrix.push(parsedata[i][0].slice(1, -2));
        }
        */

        //matrix = parsedata;
        //console.table(parsedata);

    }


var parseCsv = new uploadDealcsv();
parseCsv.getCsv();