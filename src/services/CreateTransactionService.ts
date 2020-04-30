import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const hasBalanceError =
      type === 'outcome' && balance.total < value;

    if (hasBalanceError) {
      throw Error('Not able to create outcome transaction without a valid balance');
    }

    const transaction = this.transactionsRepository
      .create({ title, type, value });

    return transaction;
  }
}

export default CreateTransactionService;
