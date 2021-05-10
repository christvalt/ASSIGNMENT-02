package pcd.ass1.sol.part2;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.*;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.text.PDFTextStripper;


public class DocDiscoverer extends BasicAgent {

	private File startDir;
	//private BoundedBuffer<File> docFiles;
	private int nDocsFound;
	private Flag stopFlag;
	private ExecutorService exec;
	private PDFTextStripper stripper;
	private String  chunk;
	private WordFreqMap map;
	private HashMap<String,String> wordsToDiscard;





	public DocDiscoverer(File dir, HashMap<String,String> wordsToDiscard, Flag stopFlag, WordFreqMap map) throws IOException {
		super("doc-discoverer");
		this.startDir = dir;	
		//this.docFiles = docFiles;
		this.stopFlag = stopFlag;
		exec = Executors.newFixedThreadPool(10);
		stripper = new PDFTextStripper();
		this.chunk=chunk;
		this.map = map;
		this.wordsToDiscard = wordsToDiscard;



	}

	@Override
	public void compute() {
		List<RecursiveAction> forks= new LinkedList<>() ;

		log("started.");
		nDocsFound = 0;
		if (startDir.isDirectory()) {
			explore(startDir);
			if (stopFlag.isSet()) {
				log("job done - " + nDocsFound + " docs found.");
			} else {
				log("stopped.");
			}
		}

		for (RecursiveAction task : forks) {
			task.join();
		}
	}

	private void explore(File dir) {
		List<RecursiveAction> forks= new LinkedList<>() ;

		if (!stopFlag.isSet()) {
			for (File f: dir.listFiles()) {
				if (f.isDirectory()) {
					DocDiscoverer task = null;
					try {
						task = new DocDiscoverer(f, wordsToDiscard, stopFlag,map);
					} catch (IOException e) {
						e.printStackTrace();
					}
					forks.add(task);
					task.fork();
				} else if (f.getName().endsWith(".pdf")) {
					try {
						log("found a new doc: " + f.getName());
						DocLoader task = new DocLoader("",f , wordsToDiscard,stopFlag, map);
						forks.add(task);
						task.fork();

						nDocsFound++;
					} catch (Exception ex) {
						ex.printStackTrace();
					}
				}
			}
		}
	}
}
