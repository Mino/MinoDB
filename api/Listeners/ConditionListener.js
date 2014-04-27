public interface ConditionListener {
    public void subConditionHasError(int index, ValidatorError fe);
    public void subConditionCompleted(int index);
}