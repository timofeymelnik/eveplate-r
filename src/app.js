import React, {Component} from 'react'
import DeveryExplorer from './devery'
import LoadData from './LoadData'
import PostData from './PostData';

export default class extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            account: '',
            brandAddr: '',
            productAddr: '',
            appAddr: '',
        }
    }

    componentDidMount() {
        DeveryExplorer.getAccount(async (account) => {
            if (this.state.account === account) return;
            this.setState({account});
            await DeveryExplorer.checkAndUpdateAllowance(account);
        })
    }

    handleChangeInput = field => event => this.setState({[field]: event.target.value});

    /* Handle App */
    handleGetAppAccounts = () => DeveryExplorer.getAppAccounts();
    handleGetApp = () => DeveryExplorer.getApp(this.state.appAddr);
    handleAddApp = data => DeveryExplorer.addApp(this.state.account, data);

    /* Handle Brand */
    handleGetBrandAccounts = () => DeveryExplorer.getBrandAccounts();
    getBrand = () => DeveryExplorer.getBrand(this.state.brandAddr);
    handleAddBrand = data => DeveryExplorer.addBrand(this.state.account, data);

    /* Handle Account permission to mark account */
    handlePermissionAccount = () => DeveryExplorer.permissionAccount(this.state.account);

    /* Handle Product */
    handleGetProductAccounts = () => DeveryExplorer.getProductAccounts();
    getProduct = () => DeveryExplorer.getProduct(this.state.productAddr);
    handleAddProduct = data => DeveryExplorer.addProduct(data);

    /* Handle ERC721 */
    handleTransfer = (toAddress, tokenId) => DeveryExplorer.safeTransferTo(this.state.account, toAddress, tokenId);

    render() {
        const {
            account, appAddr, brandAddr, productAddr
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
                        <input type="text" placeholder="App Address" onChange={this.handleChangeInput('appAddr')}/>
                    </label>
                    {
                        !appAddr
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
                        !account
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
                        <input type="text" placeholder="Enter Brand Address" onChange={this.handleChangeInput('brandAddr')}/>
                    </label>

                    {
                        !brandAddr
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
                        !account
                            ? (<span>Login with metamask first!</span>)
                            : (<PostData
                                postDataFunc={this.handleAddBrand}
                            />)
                    }
                </fieldset>

                <fieldset>
                    <h3>Permission account marking</h3>
                    {
                        !account
                            ? (<span>Login with metamask first!</span>)
                            : (<PostData
                                postDataFunc={this.handlePermissionAccount}
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
                        <input type="text" placeholder="Enter A Product Address"
                               onChange={this.handleChangeInput('productAddr')}/>
                    </label>

                    {
                        !productAddr
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
                        !account
                            ? (<span>Login with metamask first!</span>)
                            : (<PostData
                                postDataFunc={this.handleAddProduct}
                            />)
                    }
                </fieldset>


                <h2>OWNER INFO</h2>

                <fieldset>
                    <h3>Transfer Token:</h3>
                    {
                        !account
                            ? (<span>Login with metamask first!</span>)
                            : (<PostData
                                postDataFunc={this.handleTransfer}
                                fields={['toAddress', 'tokenId']}
                            />)
                    }
                </fieldset>
            </div>
        )
    }
}