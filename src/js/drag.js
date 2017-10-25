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
        listValue:'='
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
           
           
          var item = document.getElementById(e.dataTransfer.getData('Text')).cloneNode(true);
        
          
          item.classList.remove('drag');
            var ids = $('.bin .item').map(function(){
  return $(this).attr('id');
        
  }).get();
         //console.log(ids);
            
            
var set = new Set(ids);
console.log(set.size === ids.length);
console.log(set.has(item.id));
            if(set.has(item.id)){
                alert(item.innerHTML +" has already been selected!");
            }
            else{
                this.appendChild(item);
            }//remove duplicate items
            listValue=set.has(item.id);
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
     var itemArray=[];
    var items=[];
  $scope.handleDrop = function(item, bin) {
     if(listValue){
         
       jQuery("#myModal").modal('hide');
     }
      else{
            jQuery("#myModal").modal('show');
      }
      $scope.itemName=item;
      /* $http.get("customers_sql.aspx")
    .then(function (response) {$scope.names = response.data.records;});*/
       $scope.userProfiles = [
    
     {id: 10, name: 'Carton'},
     {id: 27, name: 'Bernard'},
     {id: 39, name: 'Julie'},
  ];
  $scope.myModel= $scope.userProfiles[0]; 
     
       $scope.submit = function(){
           var string=item+':'+JSON.stringify($scope.myModel);
           itemArray.push(string);
          
            
 //console.log(itemArray);
            jQuery("#myModal").modal('hide');
 }
   $scope.save=function(){
      
      
       console.log(itemArray);//pass this value to search string
      
   }
    //alert('Item ' + item + ' has been dropped into ' + bin);
  }
});
  