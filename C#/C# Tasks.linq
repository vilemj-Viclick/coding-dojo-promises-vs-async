<Query Kind="Statements">
  <Output>DataGrids</Output>
  <Reference>&lt;RuntimeDirectory&gt;\System.Threading.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Threading.Tasks.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Threading.Tasks.Parallel.dll</Reference>
  <Namespace>System.Threading.Tasks</Namespace>
</Query>

async Task<string> executeTask(string name, int delay, bool fail=false){
 await Task.Delay(delay);
 if(fail){
 	throw new Exception(name);
 }
 return name;
}














async void run1() {
	try{
		await executeTask("Task1", 200);
		executeTask("Task2", 100, true);
		await executeTask("Task3", 300);
	}
	catch(Exception e){
		e.Dump();
	}
}

async void run2() {
	try{
		Task.WaitAll(
			(new Task<string>[]{
				executeTask("Task1", 200),
				executeTask("Task2", 100, true),
				executeTask("Task3", 3000),
			})
		);
	}
	catch(Exception e){
		e.Dump();
	}
}

run2();





