package pcd.ass1.sol.part2;

import java.util.concurrent.RecursiveAction;
import java.util.concurrent.RecursiveTask;

public abstract class BasicAgent<T> extends RecursiveAction {

	private String name;


	protected void logDebug(String msg) {
		// System.out.println("[ " + getName() +"] " + msg);
	}
	protected BasicAgent(String name) {
		this.name = name;
	}


	protected void log(String msg) {
		System.out.println("[ " + this.name +"] " + msg);
	}
}
