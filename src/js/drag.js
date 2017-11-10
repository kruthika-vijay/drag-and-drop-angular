var app = angular.module('dragDrop', []);

app.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
         
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

app.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '=',
        listValue_m:'=',
        listValue_f:'='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];

      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragenter',
        function(e) {


          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragleave',
        function(e) {

          this.classList.remove('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          this.classList.remove('over');
          var binId = this.id;
           console.log("bin",this.id);

          var item = document.getElementById(e.dataTransfer.getData('Text')).cloneNode(true);


          item.classList.remove('drag');
            var ids_m = $('#Male .item').map(function(){
  return $(this).attr('id');

  }).get();
            var ids_f = $('#Female .item').map(function(){
  return $(this).attr('id');

  }).get();
         //console.log(ids);


var set_m = new Set(ids_m);
            var set_f = new Set(ids_f);
//console.log(set.size === ids.length);
console.log("male",set_m.has(item.id));
            console.log("female",set_f.has(item.id));
            if(set_m.has(item.id) && this.id=="Male"){
                alert(item.innerHTML +" has already been selected for male!");
            }
            else if(set_f.has(item.id) && this.id=="Female"){
                alert(item.innerHTML +" has already been selected for female!");
            }
            else{
                this.appendChild(item);
            }//remove duplicate items
            listValue_m=set_m.has(item.id);
             listValue_f=set_f.has(item.id);

                   // item.replaceWith("test");//replace title with category
            //console.log(item,item.innerHTML);


          // call the passed drop function
          scope.$apply(function(scope) {


            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(item.id, binId);

                //alert(item.id);//pass this value to API to get values for <select>
            }
          });

          return false;
        },
        false
      );
    }
  }
});

app.controller('DragDropCtrl', function($scope) {
    myObj = { "female":null, "male":null};
     var itemArray_m=[];
     var itemArray_f = []
      var searchString=[];
    $scope.itemList=[{'name':'College','icon':'fa fa-university'}, {'name':'Education','icon':'fa fa-graduation-cap'}, {'name':'Subject of study','icon':'fa fa-graduation-cap'},{'name':'Score','icon':'fa fa-graduation-cap'},{'name':'Proximity of residence','icon':'fa fa-graduation-cap'},{'name':'Location','icon':'fa fa-graduation-cap'},{'name':'Compensation','icon':null},{'name':'Notice period','icon':'fa fa-graduation-cap'},{'name':'Expected salary','icon':'fa fa-usd'},{'name':'Interview ratings','icon':'fa fa-star'},{'name':'Promotion expectation','icon':'fa fa-usd'}];

  $scope.handleDrop = function(item, bin) {
     if(listValue_m && bin=="Male"){

       jQuery("#myModal").modal('hide');
     }
      else if(listValue_f && bin=="Female"){

       jQuery("#myModal").modal('hide');
     }
      else{
            jQuery("#myModal").modal('show');
      }
      console.log(item);
      $scope.itemName=item.substr(7, 40);
      $scope.binName=bin;

      /* $http.get("customers_sql.aspx")
    .then(function (response) {$scope.names = response.data.records;});*/
       $scope.userProfiles = [

     {id: 10, name: 'Carton'},
     {id: 27, name: 'Bernard'},
     {id: 39, name: 'Julie'},
  ];
  $scope.myModel= $scope.userProfiles[0];


       $scope.submit = function(){

           var subCategory=JSON.stringify($scope.myModel);
           var string="\{"+"\""+item+"\""+':'+subCategory+"\}";
           searchString.push(string);

           if(bin == "Male"){
                itemArray_m.push(string);
               myObj.male = itemArray_m
           }
           else{
                itemArray_f.push(string);
               myObj.female = itemArray_f
           }

           var gender="\{"+"\""+bin+"\""+":"+[searchString]+"\}";


                      console.log(myObj)








 //console.log(itemArray);
            jQuery("#myModal").modal('hide');
 }
   $scope.save=function(){

      var newStr="";
       console.log(myObj);//pass this value to search string
       for(var i=0;i<myObj.length;i++){
            newStr=JSON.parse(myObj[i]);
       }
      $scope.searchString=newStr;
   }
    //alert('Item ' + item + ' has been dropped into ' + bin);
  }
});
  