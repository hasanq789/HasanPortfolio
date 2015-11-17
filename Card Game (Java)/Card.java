
public class Card implements Comparable<Card> {
	private int number;
	
	//Constructor for this class 
	public Card(int n){
		this.number = n;
	}
	
	// returns the number of the card
	int get_number(){
		return this.number;
	}

	@Override
	public int compareTo(Card o) {
		 if (! (o instanceof Card))    
             throw new ClassCastException("Oops!");      
        int result = this.number - o.number;   
        if ( result > 0) return -1;   
        if ( result < 0) return 1;   
        return 0; 
	}

}
