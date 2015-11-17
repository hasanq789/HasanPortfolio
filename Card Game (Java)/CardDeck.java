import java.util.ArrayList;
import java.util.Collections;


public class CardDeck {
	ArrayList<Card> deck;
	
	public CardDeck(){
		deck = new ArrayList<Card>();
		for(int i = 0; i < 8; i++){
			for(int j = 0; j < 4; j++){
				deck.add(new Card(i));
			}
		}
		Collections.shuffle(deck);
	}
	
	synchronized public Card draw(){
		return deck.remove(0);
	}
	
	public void discard(Card c){
		deck.add(c);
	}
	
	@Override
	public String toString(){
		String str = "";
		for(int i =0; i < deck.size(); i++){
			str = str + deck.get(i).get_number() + " ";
		}
		return str;
	}

}
