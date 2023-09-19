// account initial state
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// account reducer function
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      return {
        ...state,
        loanPurpose: action.payload.purpose,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
      };
    case "account/loanPayback":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

// Account Actions Creators Functions
function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  else
    return async function (dispatch, getState) {
      dispatch({ type: "account/convertingCurrency" });
      const rate = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${currency}`
      );
      const data = await rate.json();
      const amountInUSD = amount / data.rates.USD;
      dispatch({ type: "account/deposit", payload: amountInUSD });
    };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function loanPayback() {
  return { type: "account/loanPayback" };
}

export { deposit, withdraw, requestLoan, loanPayback };
