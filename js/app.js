      var myAppModule = angular.module('myApp', []);

      myAppModule.directive('query', function() {
        return {
            restrict: 'E',
            templateUrl: 'query-template.html',
            scope: {
                db: '=',
                query: '@',
                editable: '@',
                done: '='
            },
            link: function(scope) {
            },
            controller: function($scope){
                $scope.run_query = function(query) {
                    try {
                        $scope.error = null

                        var stmt = $scope.db.prepare(query);

                        stmt.getAsObject();

                        stmt.bind();

                        $scope.rows = [];
                        while(stmt.step()) {
                            var row = stmt.getAsObject();
                            $scope.rows.push(row);
                        }
                        $scope.columns = Object.keys($scope.rows[0]);
                        $scope.done = true
                    }
                    catch(err) {
                        $scope.error = err.toString();
                    }

                };

                $scope.clear = function () {
                    $scope.rows = null;
                    $scope.columns = null;
                };

            }
        };
      });

      function initialize_table(table_name, db){
        db.run("CREATE TABLE "+table_name+" ("+TABLES[table_name].schema+");");

        values = TABLES[table_name].data[0].length

        qmarks = "?"
        for (var i=1; i<values; i++) {
            qmarks += ",?"
        }

        TABLES[table_name].data.forEach( function( item ){
            db.run("INSERT INTO "+table_name+" VALUES ("+qmarks+")", item);
        } );
      }

      myAppModule.controller('appController', function($scope) {
        var db = new SQL.Database();
        $scope.db = db;

        $scope.tables = ['students', 'courses', 'participations'];
        $scope.tables.forEach( function(table){
            initialize_table(table, db);
        });

        $scope.table_details = function (table_name) {
            return TABLES[table_name].schema;
        }
      });