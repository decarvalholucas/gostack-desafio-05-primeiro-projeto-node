import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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
    const { income, outcome, total } = this.transactions.reduce(
      (acumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulator.income += transaction.value;
            break;
          case 'outcome':
            acumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        acumulator.total = acumulator.income - acumulator.outcome;
        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
