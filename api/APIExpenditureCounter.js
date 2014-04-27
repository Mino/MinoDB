public class APIExpenditureCounter {

    private AtomicInteger value;

    public APIExpenditureCounter() {
        value = new AtomicInteger();
    }

    public int getValue() {
        return value.get();
    }

    public int increment(int amount) {
        int v;
        do {
            v = value.get();
        }
        while (!value.compareAndSet(v, v + amount));

        return v + amount;
    }

}