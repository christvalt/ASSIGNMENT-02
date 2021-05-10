package pcd.ass1.sol.part2;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.RecursiveAction;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.text.PDFTextStripper;



public class DocLoader extends BasicAgent {

	//private BoundedBuffer<File> docFiles;
	private String chunks;
	private PDFTextStripper stripper;
	private Latch loadersLatch;
	private Flag stopFlag;
	private ExecutorService exec;
	private String  chunk;
	private DocDiscoverer docFiles;
	private File f;
	private List<RecursiveAction> forks;
	private WordFreqMap map;
	private HashMap<String, String> wordsToDiscard;


	public DocLoader(String id, File  f, HashMap<String,String> wordsToDiscard, Flag stopFlag,WordFreqMap map) throws Exception  {
		super("doc-loader-" + id);
		this.stopFlag = stopFlag;
		this.docFiles = docFiles;
		this.f =f;
		this.map =map;
		this.wordsToDiscard = wordsToDiscard;
		this.chunks = chunks;
		this.chunk = chunk;
        stripper = new PDFTextStripper();
        this.loadersLatch = loadersLatch;
		exec = Executors.newFixedThreadPool(10);
		this.forks = new LinkedList<>();


	}

	/*
	* public void run() {
		log("started");
		int nJobs = 0;
		boolean noMoreDocs = false;
		while (!noMoreDocs) {
			try {
				File doc = docFiles.get();
				if (!stopFlag.isSet()) {
					nJobs++;
					logDebug("got a doc to load: " + doc.getName() + " - job: " + nJobs);
					try {
						loadDoc(doc);
						logDebug("job " + nJobs + " done.");
					} catch (Exception ex) {
						log("error in processing the " + nJobs + " doc.");
					}
				} else {
					log("stopped");
				}
			} catch (ClosedException ex) {
				log("no more docs.");
				noMoreDocs = true;
			}
		}
		loadersLatch.countDown();
		log("done.");
	}*/

	/*
	* private void loadDoc(File doc) throws Exception {
        PDDocument document = PDDocument.load(doc);
        AccessPermission ap = document.getCurrentAccessPermission();
        if (!ap.canExtractContent())
        {
            throw new IOException("You do not have permission to extract text");
        }
        logDebug("doc loaded.");

        int nPages = document.getNumberOfPages();
        logDebug("Chunks to be processed: " + nPages);
        for (int i = 0; i < nPages; i++) {
            stripper.setStartPage(i);
            stripper.setEndPage(i);
            String chunk =  stripper.getText(document);
			chunks.put(chunk);
			logDebug("chunk added (" + i + ")");
        }
  	}*/

	@Override
	public void compute(){
		log("started");
		if (!stopFlag.isSet()) {
			log("got a doc to load: " + f.getName());
			try {
				loadDoc(f);
			} catch (Exception ex) {
			}
		} else {
			log("stopped");
		}
		log("done.");

		for (RecursiveAction task : forks) {
			task.join();
		}
	}



	private void loadDoc(File f) throws Exception {
		PDDocument document = PDDocument.load(f);
		AccessPermission ap = document.getCurrentAccessPermission();
		if (!ap.canExtractContent())
		{
			throw new IOException("You do not have permission to extract text");
		}

		int nPages = document.getNumberOfPages();
		log("Chunks to be processed: " + nPages);
		for (int i = 0; i < nPages; i++) {
			stripper.setStartPage(i);
			stripper.setEndPage(i);
			String chunk =  stripper.getText(document);
			System.out.println(chunk);
			try {
				TextAnalyzer task = new TextAnalyzer("" ,wordsToDiscard,chunk,map, stopFlag);
				forks.add(task);
				task.fork();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		}
	}


}
