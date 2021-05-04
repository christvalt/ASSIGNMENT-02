package part1;

public class Viewer extends BasicAgentTask {

	private WordFreqMap map;
	private View view;
	private Flag done;
	
	protected Viewer(WordFreqMap map, View view, Flag done) {
		super("viewer");
		this.map = map;
		this.view = view;
		this.done = done;
	}

	public void compute() {
		log("started.");
		while (!done.isSet()) {
			try {
				view.update(map.getCurrentMostFreq());
				Thread.sleep(10);
			} catch(Exception ex) {
				ex.printStackTrace();
			}
		}
		view.update(map.getCurrentMostFreq());
	}
}
