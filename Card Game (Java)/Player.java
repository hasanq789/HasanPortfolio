import java.util.*;
import java.util.concurrent.Semaphore;

public class Player implements Runnable{
	private String name;
	private CardDeck currentDeck;
	private ArrayList<Card> cards;
	private static final Semaphore mutex = new Semaphore(1);

//---------------------------------------------------------------------------------------------------		
	
	public Player(String n, CardDeck d){
		this.name = n;
		this.currentDeck = d;
		cards = new ArrayList<Card>();
	}

//---------------------------------------------------------------------------------------------------		
	public String get_name(){
		return this.name;
	}
		
	public ArrayList<Card> get_cards(){
		return cards;
	}
	
//---------------------------------------------------------------------------------------------------	
	public void add_cards(Card c1, Card c2, Card c3, Card c4){
		cards.add(c1);
		cards.add(c2);
		cards.add(c3);
		cards.add(c4);
		
		System.out.print(this.name + "'s First four cards are: ");
		String str = "";
		for(int i =0; i < cards.size(); i++){
			str = str + cards.get(i).get_number() + " ";
		}
		System.out.println(str);
	}
	
//Promises: checks to see if the player has same number of cards
	public boolean same_denomination(){
		int c1, c2, c3, c4;
		c1 = cards.get(0).get_number();
		c2 = cards.get(1).get_number();
		c3 = cards.get(2).get_number();
		c4 = cards.get(3).get_number();
		
		if(c1 == c2 && c3 == c4 && c1 == c3){
			return true;
		}else return false;
	
	}
//---------------------------------------------------------------------------------------------------			
	
	public void sort(){
		Collections.sort(cards);
	}
	
//---------------------------------------------------------------------------------------------------	
	
		
	//Promises: does all the player moves. Including drawing a card and discarding it.
	public void player_move(){
		
		System.out.println("------------------------------------------------------------------------------");
		System.out.println(this.name + " is Playing...");
		Card temp = currentDeck.draw();
		System.out.println(this.name + " draws " + temp.get_number() + " from the deck.");
		this.cards.add(temp);
		this.sort();
		System.out.println(this.name + "'s five cards after DRAWING a card from deck are: " + this.toString() + "  (sorted)");
		
		int discard;
		int i = 0;
		
		Scanner scan_discard = new Scanner(System.in);
		boolean flag = false;
		while(!flag){
			System.out.println(this.name + ": Please discard one of the five cards in your hand ");
			discard = scan_discard.nextInt();
			for(i =0; i < cards.size(); i++){
				if(cards.get(i).get_number() == discard){
					flag = true;
					break;
				}
			}
			
		}
		
		Card discarded_card = cards.remove(i);
		currentDeck.discard(discarded_card);
		System.out.println(this.name + "'s four cards after DISCARD are: " + this.toString());
		System.out.println(currentDeck.toString());
		if(same_denomination()){
			System.out.println(this.name + " is the winner.");
			System.exit(0);
		}
		notifyAll();
	}
	
//---------------------------------------------------------------------------------------------------			

	@Override
	public String toString(){
		String str = "";
		for(int i =0; i < cards.size(); i++){
			str = str + cards.get(i).get_number() + " ";
		}
		return str;
	}
	
//---------------------------------------------------------------------------------------------------		
	@Override
	public void run() {
		synchronized(this){
			while(true){
			try {
				mutex.acquire();
				this.player_move();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}finally{
				mutex.release();
				try {
					Thread.sleep(100);
				} catch (InterruptedException e) {
					e.printStackTrace();
					}	
				}
			}
		}
	}
}
