'use strict';

app.controller('CodeCtrl', function CodeCtrl($scope, $timeout, snippets, scaladoc, insight) {
  (function(){ /* Doc */

    $scope.docs = [];
    $scope.snippets = [];

    $scope.search = function(term){
      $scope.docs = scaladoc.query(term);
      $scope.snippets = snippets.query(term);
      $scope.all = $scope.docs.concat($scope.snippets);
    };

    $scope.hasDocs = function(){
      return $scope.docs.length > 0;
    };

    $scope.hasSnippets = function(){
      return $scope.snippets.length > 0;
    };

    $scope.select = function(item){
      $scope.code += '\n\n' + item.code;
      $scope.insight += '\n\n' + item.insight;
      // $scope.term = "";
    };
  })();
  
  (function(){ /* Code & Insight */
    $scope.timer = null;
    $scope.code = "";
    $scope.insightCode = "";

    /* Defining the Left and Right CodeMirroir */
    $scope.cmLeft = null;
    $scope.cmRight = null;

    $scope.options = {
      fixedGutter: false,
      lineNumbers: true,
      mode: 'text/x-scala',
      theme: 'solarized dark',
      smartIndent: false,
      autofocus: true,
      onChange: function(cm,event) {

        // $scope.insightState = 'fetching';
        // if($scope.timer) {
        //   $timeout.cancel($scope.timer);
        // }
        // $scope.timer = $timeout(function(){
        //   $scope.insightState = '';

        //   var res = [];
        //   $scope.code.split('\n').forEach(function(line){
        //     res.push(changes[line]);
        //   })
        //   $scope.insightCode = res.join('\n');

        // }, 1000);

        //$scope.insightCode = insight($scope.code);
      },
      onScroll: function(cm) {
        if ($scope.cmLeft === null) {
          $scope.cmLeft = cm;
        }

        var scrollLeftInfo = cm.getScrollInfo();
        if ($scope.cmRight !== null) {
          $scope.cmRight.scrollTo(null, scrollLeftInfo['top']);
        }
      },
      onLoad: function(cm) {
        $scope.cmLeft = cm;
      }
    };
    $scope.options2 = {
      fixedGutter: false,
      lineNumbers: true,
      mode: 'text/x-scala',
      theme: 'solarized light',
      readOnly: 'nocursor',
      onScroll: function(cm) {
        if($scope.cmRight === null) {
          $scope.cmRight = cm;
        }

        var scrollRightInfo = cm.getScrollInfo();
        if ($scope.cmLeft !== null) {
          $scope.cmLeft.scrollTo(null, scrollRightInfo['top']);
        }
      },
      onLoad: function(cm) {
        $scope.cmRight = cm;
      }
    };

    $scope.options3 = {
      mode: 'text/x-scala',
      theme: 'solarized light',
      readOnly: 'nocursor'
    };
  })();
  
  (function() { /* Insight toggling */
    $scope.insightShow = true;
    $scope.insightToggler = function() {
        $scope.insightShow = !$scope.insightShow;
    }
  })();

  (function() { /* This part of the code is for the User's behavior in the header of the site */
    $scope.userDropDownShow = false;
    $scope.onUserClick = function() {
      $scope.userDropDownShow = !$scope.userDropDownShow;
    }
  })();

  (function() { /* The showing of the Modal */
    $scope.modalShow = true;
    $scope.showSettingsModal = function() {
      $scope.modalShow = !$scope.modalShow;
    }
  })();
});