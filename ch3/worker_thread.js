const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) { // 메인 스레드
    const threads = new Set();

    threads.add(new Worker(__filename, {
        workerData: { start: 1 },
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2 },
    }));

    for (let worker of threads) {
        worker.on('message', (value) => console.log('from worker:', value));
        worker.on('exit', () => {
            console.log('worker exit')
            if (threads.size === 0) {
                threads.delete(worker);
            }
        });
    }
} else { // 워커 스레드
    const data = workerData;
    parentPort.postMessage(data.start + 100);
}