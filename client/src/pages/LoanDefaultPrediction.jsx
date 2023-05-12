import React from 'react'
import Communicode1 from '../images/communicode1.jpeg'
import { Tag, Social } from '../components'

import loandefault1 from '../images/loandefault1.png'

const LoanDefaultPrediction = (props) => {
    return (
        <div>
            <img src={loandefault1} className="w-full h-[200px] object-cover"/>
            <div className="p-8 pt-3">
                <div className="my-5" style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll'}}>
                    <h1 className="text-4xl font-bold mb-0"> Loan Default Prediction </h1>
                    <div style={{ color: 'white', marginLeft: 'auto' }}>
                        <Social name="GitHub" link="https://github.com/NicholasDullam/loan_default"/>
                    </div>
                </div>                      
                <div className="flex mb-5 overflow-x-scroll">
                    <Tag>Python</Tag>
                </div>
                <h6 className="mt-5"> An ML investigation on the defaulting of loans.</h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                <p> When an borrower defaults on a loan, they fail to repay their debt according to the initial arrangements set by the debtor -- a failed repayment proves to be an issue with both parties involved. Our goal was to predict whether a borrower would default on a loan, given their outlined characteristics and credit history using Principal Component Analysis, and K-nearest Neighbors. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Role |<span className="text-base opacity-50"> Member </span> </h3>
                <p> Working on the project, I acted as a team member alongside two other students to follow through on our goal of accurately predicting a borrower's defaulting behavior. As teammates, we all followed through on our strengths, collaborating on the direction of the project and ensuring representative results with regular code reviews.</p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Creating a Model </h3>
                <p> As an overview of our methodology, we took a training, testing, and validation approach to predicting the defaulting of loans based upon 50 features provided a pruned sample of individual financial statements. With all of our implementations with custom algorithm configurations in Python, we tuned our hyperparameters for PCA to include a dimensionality reduction of 6, minimizing our error rate of ~8.4%. As for our K-nearest Neighbors implementation, we minimized our error rate over sample sizes of 100, with k-values of 2 and 4 respectively, at ~10%. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p> As one of my first involved applications of machine learning, I found the importance of not only understanding the underlying models and algorithms, with our custom implementations, but the importantance of cross-validating our own implementations among ourselves, helping to reduce compute time by getting it right the first time, and pushing for accurate and representative results. </p>
            </div>
        </div>
    )
}

export default LoanDefaultPrediction