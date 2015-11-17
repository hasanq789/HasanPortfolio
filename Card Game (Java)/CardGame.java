import java.util.Scanner;


public class CardGame {
	private CardDeck deck;
	private Player player1;
	private Player player2;
	
	public CardGame(String p1, String p2){
		this.deck = new CardDeck();
		this.player1 = new Player(p1, deck);
		this.player2 = new Player(p2, deck);
		
		Dealer dealer = new Dealer(deck, player1, player2);
		Thread t1 = new Thread(player1);
		Thread t2 = new Thread(player2);
		
		t1.start();
		t2.start();
	}

	public static void main(String[] args) {
		System.out.println("Game Started...");
		
		Scanner scan = new Scanner(System.in);
		System.out.print("Please enter the player's name: ");
		String name1 = scan.nextLine();
		System.out.print("Please enter the other player's name: ");
		String name2 = scan.nextLine();

		new CardGame(name1, name2);
		
	}

}
