package pcd.ass1.sol.part2;

import java.util.*;
import java.util.concurrent.RecursiveTask;



public class TextAnalyzer extends BasicAgent {

	private String chunks;
	private HashMap<String,String> wordsToDiscard;
	private WordFreqMap map;
	private Latch analyzersLatch;
	private Flag stopFlag;
	private  DocLoader docLoader;
	
	public TextAnalyzer(String id, HashMap<String,String> wordsToDiscard, String chunks, WordFreqMap map, Flag stopFlag) throws Exception  {
		super(id);
		this.chunks = chunks;
		this.wordsToDiscard = wordsToDiscard;
		this.map = map;
		this.analyzersLatch = analyzersLatch;
		this.stopFlag = stopFlag;
		this.docLoader=docLoader;
	}
	

	protected void mergeCounts(Map<String, Integer> map1, HashMap<String, Integer> map2) {
		for (Map.Entry<String, Integer> entry : map2.entrySet()) {
			Integer count = map1.get(entry.getKey());
			count = count == null ? 0 : count;
			map1.put(entry.getKey(), count + entry.getValue());
		}
	}

	public void compute() {
		try {
			String del = "[\\x{201D}\\x{201C}\\s'\", ?.@;:!-]+";
			if (!stopFlag.isSet()) {
				String[] words = chunks.split(del);
				for (String w: words) {
					String w1 = w.trim().toLowerCase();
					if (!w1.equals("") && !wordsToDiscard.containsKey(w1)) {
						map.add(w1);
					}
				}
			} else {
				log("stopped.");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		log ("done");
	}


	protected void log(String msg) {
		System.out.println("[ "  +"] " + msg);
	}
	protected void logDebug(String msg) {
		// System.out.println("[ " + getName() +"] " + msg);
	}
}
