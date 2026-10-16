import BasePage from "./BasePage";

export default class PopupsAlertsPage extends BasePage{
 
 //-----------------------Alerts
//registering instructions in advance for what to do whenever the event happens
 //Listen for alert event 
 async alerts(){
    let alertMessage= ""; // declared OUTSIDE the handler
   // await this.page.getByRole("button",{name:"Show Alert"}).click()
   // Expected: "Hello! This is a simple alert dialog."
   // Received: ""

   //The trap (handler) has to be set before the mouse (the popup) shows up.
this.page.once("dialog", async(dialog)=>{ //once- reacts a single time then stops listening
alertMessage= dialog.message(); // reads the popup's text. No await needed; it's not a Promise
 await dialog.accept() //Click OK. Needs await, since it's a real action.
})
     //Trigger the alert
 await this.page.getByRole("button",{name:"Show Alert"}).click()

return alertMessage //can see and use the same variable
} 

//-----------------------Confirm
//one parameter representing a single choice between two possibilities
async confirm(action: "accept"| "dismiss"){
let confirmMessage= ""

this.page.once("dialog", async(dialog)=>{
    confirmMessage= dialog.message()
 if (action=== "accept"){
await dialog.accept();
} else{
    await dialog.dismiss()
}
})
await this.page.getByRole("button",{name:"Show Confirm"}).click()
return confirmMessage
}

getConfirmMessage(){
    return this.getElement(this.page.locator("#confirmResult"))
}

//-----------------------Prompt
async prompt(){
    let promptMessage ="";

this.page.once("dialog", async(dialog)=>{
promptMessage= dialog.message()
await dialog.accept("Albina")
})    

await this.page.getByRole("button", {name:"Show Prompt"}).click()
return promptMessage
}

getPromptMessage(){
    return this.getElement(this.page.locator("#promptResult"))
}

//-----------------------Popup
//this is genuinely a new tab/window
//click the button, and hand back the popup window itself (wrapped in a class instance)
async popupPage(){
const [popup]= await Promise.all([
    this.page.waitForEvent("popup"),
    this.page.getByRole("button", {name:"Open Popup Window"}).click()
])
return new PopupsAlertsPage(popup, this.context)
}

getPopupConfirmationMessage(){
    return this.getElement(this.page.locator("#popupResult"))
}

getPopupTitleMessage(){
return this.getElement(this.page.getByRole("heading",{name:"Popup Page"}))
}

getPopupBodyMessage(){
return this.getElement(this.page.getByText("This is a popup window."))
}

async closePopupWindow(){
await this.page.close()
}}