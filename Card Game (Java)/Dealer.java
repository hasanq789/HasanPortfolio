
public class Dealer {
	
	public Dealer(CardDeck deck, Player p1, Player p2){
		
		p1.add_cards(deck.draw(), deck.draw(), deck.draw(), deck.draw());
		p2.add_cards(deck.draw(), deck.draw(), deck.draw(), deck.draw());
	}
}
