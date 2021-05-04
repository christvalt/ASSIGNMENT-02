package part1;
import java.util.concurrent.RecursiveAction;

public abstract class BasicAgentTask extends RecursiveAction {

	private String name;

	protected BasicAgentTask(String name) {
		this.name = name;
	}

	protected void log(String msg) {
		System.out.println("[ " + this.name +"] " + msg);
	}
}
