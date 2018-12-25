class Step {
  constructor(id) {
    this.id = id;
    this.children = [];
    this.parents = [];
    this.done = false;
  }

  addChild(step) {
    this.children.push(step);
    step.parents.push(this);
  }

  isRoot() {
    return this.parents.length === 0;
  }

  allParentsAreDone() {
    if (this.isRoot()) return true;
    return this.parents.every(p => p.done);
  }
}

class Worker {
  constructor(id) {
    this.id = id;
    this.job = null;
  }

  isFree() {
    return !this.job;
  }

  workIn(job, currentClock, offset) {
    this.job = job;
    this.willBeDoneAt = currentClock + job.id.charCodeAt(0) - 64 + offset;
  }

  isDone(clock) {
    return this.willBeDoneAt && clock >= this.willBeDoneAt;
  }

  finish() {
    const { job } = this;
    this.job = null;
    this.willBeDoneAt = null;
    return job;
  }
}

const buildSteps = input => {
  const re = /^Step (.*?) must be finished before step (.*?) can begin./;
  const steps = {};
  input.forEach(instruction => {
    const [, parent, child] = instruction.match(re);
    if (!steps[parent]) steps[parent] = new Step(parent);
    if (!steps[child]) steps[child] = new Step(child);
    steps[parent].addChild(steps[child]);
  });

  return steps;
};

module.exports.challenge1 = input => {
  const steps = buildSteps(input);
  const stepsReady = new Set();
  let sequence = '';

  // Find the roots
  Object.values(steps)
    .filter(step => step.isRoot())
    .forEach(root => stepsReady.add(root));

  while (stepsReady.size) {
    const bestChild = Array.from(stepsReady)
      .filter(step => step.allParentsAreDone())
      .sort((a, b) => a.id.localeCompare(b.id))
      .shift();
    stepsReady.delete(bestChild);

    bestChild.done = true;
    sequence += bestChild.id;
    bestChild.children.forEach(child => {
      stepsReady.add(child);
    });
  }
  return sequence;
};

module.exports.challenge2 = (input, offset = 0, numThreads = 1) => {
  const steps = buildSteps(input);
  const candidateSteps = new Set();
  const inProgressSteps = new Set();
  let clock = -1;
  const workers = Array.from({ length: numThreads }, id => new Worker(id));

  // Find the roots
  Object.values(steps)
    .filter(step => step.isRoot())
    .forEach(root => candidateSteps.add(root));

  while (candidateSteps.size || inProgressSteps.size) {
    clock += 1;

    // Finds jobs that are already done in this tick.
    workers
      .filter(worker => worker.isDone(clock))
      .map(worker => worker.finish())
      .sort((a, b) => a.id.localeCompare(b.id))
      .forEach(step => {
        // eslint-disable-next-line no-param-reassign
        step.done = true;
        inProgressSteps.delete(step);
        step.children.forEach(child => {
          candidateSteps.add(child);
        });
      });

    // Extract the jobs that are ready to be processed
    const childsReady = Array.from(candidateSteps)
      .filter(step => step.allParentsAreDone())
      .sort((a, b) => a.id.localeCompare(b.id));

    // Find free workers and assign them a job
    workers
      .filter(worker => worker.isFree())
      .forEach(worker => {
        const job = childsReady.shift();

        // No job in the queue, that's fine
        if (!job) return;

        // Assign the job as being worked on
        worker.workIn(job, clock, offset);
        candidateSteps.delete(job);
        inProgressSteps.add(job);
      });
  }

  return clock;
};
