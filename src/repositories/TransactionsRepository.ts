import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .reduce((prev: number, curr: Transaction) =>
        curr.type === 'income' ? prev + curr.value : prev, 0
      );
    const outcome = this.transactions
      .reduce((prev: number, curr: Transaction) =>
        curr.type === 'outcome' ? prev + curr.value : prev, 0
      );
    const total = income - outcome;

    return {
      income,
      outcome,
      total
    };
  }

  public create({ title, value, type }: CreateRepositoryDTO): Transaction {
    const repository = new Transaction({ title, value, type });
    this.transactions.push(repository);

    return repository;
  }
}

export default TransactionsRepository;
