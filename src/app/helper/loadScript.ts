export class LoadScript{
    public loadScript(files){
        var dynamicScripts = files;
        for (var i = 0; i < dynamicScripts .length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
    public removeChild(files){
        var dynamicScripts = files;
        for (var i = 0; i < dynamicScripts .length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].removeChild(node);
      }
    }
    public getNextDate(){ 
      var today = new Date();
      let dd = today.getDate() + 1;
      let mm = today.getMonth(); 
      let yyyy = today.getFullYear();
      var nxtDate: any;
      var nxtMM: any;
      if (dd < 10) {
        nxtDate = '0' + dd;
      }
      if (mm < 10) {
        nxtMM = '0' + mm; 
      }
      return  nxtDate + '-' + nxtMM + '-' + yyyy;
    }
}