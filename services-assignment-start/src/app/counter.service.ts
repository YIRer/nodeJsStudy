export class CounterService{
  activeToInactiveCounter =0;
  InactiveToActiveCounter =0;

  incrementActiveToInactive(){
    this.activeToInactiveCounter++
    console.log(this.activeToInactiveCounter);
  }
  incrementInactiveToActive(){
    this.InactiveToActiveCounter++
    console.log(this.InactiveToActiveCounter);
  }
}
