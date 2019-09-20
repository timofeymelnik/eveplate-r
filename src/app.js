import React, {Component} from 'react'
import devery, { Utils } from '@devery/devery'
import deveryClient, {checkAndUpdateAllowance} from './devery'
import LoadData from './LoadData'
import PostData from './PostData';

export default class extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            account: '',
            checkBrandAddr: '',
            checkProductAddr: '',
            appAddr: null,
        }
    }

    componentDidMount() {
        if (!window.web3) return;

        if (window.web3.eth && window.web3.eth.accounts) {
            this.updateAccount(window.web3.eth.accounts[0]);
        }

        if (window.web3.currentProvider) {
            window.web3.currentProvider.isMetaMask && window.web3.currentProvider.enable();
            window.web3.currentProvider.publicConfigStore
                .on('update', ({selectedAddress}) => this.updateAccount(selectedAddress));
        }
    }

    updateAccount = (account) => this.setState({account});

    handleBrandAddrChange = ({ target: { value: checkBrandAddr } }) => this.setState({checkBrandAddr});

    handleProductAddrChange = ({ target: { value: checkProductAddr } }) => this.setState({checkProductAddr});

    handleAppAccountChange = ({ target: { value: appAddr } }) => this.setState({appAddr});

    // All devery methods used in this example can be found at https://devery.github.io/deveryjs/

    getBrand = async () => {
        const Brand = await deveryClient.getBrand(this.state.checkBrandAddr);
        if (!Brand.active) return Promise.reject('No active brand');
        return Promise.resolve(Brand)
    };

    getProduct = async () => {
        const Product = await deveryClient.getProduct(this.state.checkProductAddr);
        if (!Product.active) return Promise.reject('No product');
        return Promise.resolve(Product)
    };

    handleGetAppAccounts = () => {
        return deveryClient.appAccountsPaginated()
    };

    handleGetApp = async () => {
        return deveryClient.getApp(this.state.appAddr)
    };

    handleGetBrandAccounts = () => {
        return deveryClient.brandAccountsPaginated()
    };

    handleGetProductAccounts = () => {
        return deveryClient.productAccountsPaginated()
    };

    handleAddApp = async (data) => {
        try {
            await deveryClient.addApp(data, this.state.account, 0);
        } catch (e) {
            if (e.message.indexOf('User denied')) {
                console.log('The user denied the transaction')
            }
        }
    };

    handleAddBrand = async (data) => {
        try {
            await deveryClient.addBrand(this.state.account, data);
        } catch (e) {
            if (e.message.indexOf('User denied')) {
                console.log('The user denied the transaction')
            }
        }
    };

    handleAddProduct = async (data) => {
        try {
            const hash = await deveryClient.addProduct(Utils.getRandomAddress(), data, 'batch 001', new Date().getFullYear(), 'Unknown place');
            await checkAndUpdateAllowance(this.state.account, hash)
        } catch (e) {
            if (e.message.indexOf('User denied')) {
                console.log('The user denied the transaction')
            }
        }
    };

    render() {
        const {
            account
        } = this.state;

        return (
            <div className="Explorer">
                <h1>Devery Explorer</h1>

                <h3>User Account:</h3>
                {
                    !account
                        ? <span>Please sign in to MetaMask</span>
                        : <span>{account}</span>
                }

                <h2>APP INFO</h2>
                <fieldset>
                    <h3>Get App Accounts:</h3>

                    <LoadData
                        buttonMessage='Get App Accounts'
                        loadDataFunc={this.handleGetAppAccounts}
                    />
                </fieldset>

                <fieldset>
                    <h3>Get App:</h3>
                    <label>
                        <span>App Info: active, appAccount, appName, fee, feeAccount</span>
                        <input type="text" placeholder="App Address" onChange={this.handleAppAccountChange}/>
                    </label>
                    {
                        !this.state.appAddr
                            ? (<span>Please insert App address first!</span>)
                            : (<LoadData
                                buttonMessage='Get App'
                                loadDataFunc={this.handleGetApp}
                            />)
                    }
                </fieldset>

                <fieldset>
                    <h3>Add App:</h3>
                    {
                        !this.state.account
                            ? (<span>Login with metamask first!</span>)
                            : (<PostData
                                postDataFunc={this.handleAddApp}
                            />)
                    }
                </fieldset>

                <h2>BRAND INFO</h2>

                <fieldset>
                    <h3>Get Brand Accounts:</h3>
                    <p>This gets ALL brand accounts. i.e. Not just for your app.</p>

                    <LoadData
                        buttonMessage='Get Brand Accounts'
                        loadDataFunc={this.handleGetBrandAccounts}
                    />
                </fieldset>

                <fieldset>
                    <h3>Get Brand Info:</h3>
                    <label>
                        <span>Brand Info: brandAccount, appAccount, brandName, active</span>
                        <input type="text" placeholder="Enter Brand Address" onChange={this.handleBrandAddrChange}/>
                    </label>

                    {
                        !this.state.checkBrandAddr
                            ? (<span>Please insert Brand address first!</span>)
                            : (<LoadData
                                buttonMessage='Get Brand Info'
                                loadDataFunc={this.getBrand}
                            />)
                    }
                </fieldset>

                <fieldset>
                    <h3>Add Brand:</h3>
                    {
                        !this.state.account
                            ? (<span>Login with metamask first!</span>)
                            : (<PostData
                                postDataFunc={this.handleAddBrand}
                            />)
                    }
                </fieldset>

                <h2>PRODUCT INFO</h2>

                <fieldset>
                    <h3>Get Product Accounts:</h3>
                    <p>This gets ALL product accounts. i.e. Not just for your app/brand.</p>

                    <LoadData
                        buttonMessage='Get Product Accounts'
                        loadDataFunc={this.handleGetProductAccounts}
                    />
                </fieldset>

                <fieldset>
                    <h3>Get Product Info:</h3>
                    <label>
                        <span>Product Info: productAccount, brandAccount, description, details, year, origin, active</span>
                        <input type="text" placeholder="Enter A Product Address" onChange={this.handleProductAddrChange}/>
                    </label>

                    {
                        !this.state.checkProductAddr
                            ? (<span>Please insert Product address first!</span>)
                            : (<LoadData
                                buttonMessage='Get Product Info'
                                loadDataFunc={this.getProduct}
                            />)
                    }
                </fieldset>

                <fieldset>
                    <h3>Add Product:</h3>
                    {
                        !this.state.account
                            ? (<span>Login with metamask first!</span>)
                            : (<PostData
                                postDataFunc={this.handleAddProduct}
                            />)
                    }
                </fieldset>
            </div>
        )
    }
}