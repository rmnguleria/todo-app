var rattleTodo = angular.module('rattleTodo',[]);
function mainController($scope,$http){
	$scope.formData = {};

	//get all todos and show them.
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error :- ' + data);
		});

	//when submitting the add form , send the text to node API
	
	$scope.createTodo = function(){
		$http.post('/api/todos',$scope.formData)
			.success(function(data){
				$scope.formData = {}; //empty it again.
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error:- ' + data);
			});
	};

	//delete a todo after checking it ??
	$scope.deleteTodo = function(){
		$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error:- ' + data);
			});
	};

}