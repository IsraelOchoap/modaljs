class ModalForm {  
    constructor() {
        let CSS = `.dialog-container {
                    --dlg-title-bgcolor: #1772d4;
                    --dlg-title-color: #fff;
                    --dlg-bnt-ok-color: #fff;
                    --dlg-bnt-ok-bgcolor: #1772d4;
                    --dlg-btn-cancel-color: #1772d4;
                    --dlg-btn-cancel-bgcolor: #f3f3f3;
                    --dlg-msg-font-weight: 500;

                    display: flex;
                    justify-items: center;
                    align-items: center;
                    background-color: rgba(0,0,0,.22);
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 150;
                    width:100%;
                    height:100%;                   
                    padding: 0rem;

                }
                .dialog-form {
                    display: block;
                    margin: 5em auto;
                    min-width: 350px;
                    max-width: 500px;
                    background-color: #fff;
                    box-shadow: 3px 3px 6px #393939;
                    width:100%;
                    z-index: 1100;
                    overflow: hidden;
                    border-radius: 6px 6px 0 0;
                    transform: scale(1);
                    transition: transform ease 200ms;
                }
                .dialog-title {
                    padding: 0.5em 1.5rem;
                    font-size: 1rem;
                    color: var(--dlg-title-color);
                    background-color: var(--dlg-title-bgcolor);                  
                }
                .dialog-msg {
                    padding: 1.5rem;
                    font-size: 0.9rem;
                    font-weight:var(--dlg-msg-font-weight);
                }
                .dialog-btns {
                    padding: 0.5em 1rem;
                    text-align: right;
                    background-color: #e3e6ea;
                }
                .dialog-hide{
                    transform: scale(0);
                }
                .dialog-hide .dialog-form{
                    transform: scale(0);
                }
                .dialog-btn{
                    border-radius: 3px;
                    padding: 0.3rem 1rem;
                    border: 1px solid transparent;
                    margin-left: 0.5rem;
                    background-color: #f1f1f1;
                    cursor: pointer;
                    box-shadow: 0 0 3px rgba(0,0,0,.2);
                    font-size: .9rem;
                }
                .dialog-btn:hover{
                    box-shadow: 0 0 4px rgba(0,0,0,.3);
                }
                .dialog-btn-ok{
                    color: var(--dlg-bnt-ok-color);
                    background-color: var(--dlg-bnt-ok-bgcolor);
                }
                .dialog-btn-cancel{
                    color: var(--dlg-btn-cancel-color);
                    background-color: var(--dlg-btn-cancel-bgcolor);
                }
                .dialog-spiner-container {
                    padding-bottom:20px;
                 }
                .dialog-object-hide{
                    display:none
                }
                .dialog-spiner{
                    border-top: 4px dotted #1c5392;
                    border-bottom: 4px dotted #1c5392;
                    border-left: 4px solid #03A9F4;
                    border-right: 4px groove #1c5392;
                    border-radius: 50px;
                    width: 35px;
                    height: 35px;
                    display: block;
                    color: transparent;             
                    margin: -10px auto 10px;                  
                }

                .dialog-spiner-animate {
                    animation: animatespiner linear 1s infinite;
                }

                @keyframes animatespiner {
                    from {transform: rotate(0deg);}
                    to{transform: rotate(360deg);}
                }

                @media (max-width: 600px) { 
                    .dialog-form {
                        min-width: calc(100vw - 2rem);
                        width: calc(100vw - 2rem);
                    }
                }              
                `

        let Template = `<div class="dialog-form">    
                            <div class="dialog-title" id="DialogTitle"></div>
                            <div class="dialog-msg" id="DialogMSG"></div>
                            <div class="dialog-spiner-container dialog-object-hide" id="DialogSpiner">
                                <span class="dialog-spiner dialog-spiner-animate"></span>
                            </div>
                            <div class="dialog-btns dialog-object-hide" id="DialogBts"></div>
                            <div class="dialog-btns dialog-object-hide" id="DefaultBts">
                                <input type="button" id="btnOK" value="Aceptar" accesskey="a" class="dialog-btn dialog-btn-ok"/>
                                <input type="button" id="btnCancel" value="Cancelar" accesskey="c" class="dialog-btn dialog-btn-cancel"/>
                            </div>
                        </div>`

        let dialogCSS = document.getElementById("dialogCSS")
        if (dialogCSS == null) {
            dialogCSS = document.createElement("style")
            dialogCSS.id = "dialogCSS"
            dialogCSS.type = "text/css"
            dialogCSS.textContent = CSS
            document.body.appendChild(dialogCSS)
        }

        this.Dialog = document.getElementById("divDialogo")
        if (this.Dialog == null) {
            this.Dialog = document.createElement("div")
            this.Dialog.id = "divDialogo"
            this.Dialog.classList.add("dialog-container")
            this.Dialog.classList.add("dialog-hide")
            this.Dialog.innerHTML = Template
            document.body.appendChild(this.Dialog)
        }

        this.DialogTitle = this.Dialog.querySelector("#DialogTitle")
        this.DialogMSG = this.Dialog.querySelector("#DialogMSG")
        this.DialogBTS = this.Dialog.querySelector("#DialogBts")
        this.DialogSpiner = this.Dialog.querySelector("#DialogSpiner")
        this.DefaultBTS = this.Dialog.querySelector("#DefaultBts")
        this.Spiner = this.Dialog.querySelector(".dialog-spiner")
        this.Spiner.classList.remove("dialog-spiner-animate")
    }

    Show({ Titulo= "Titulo de prueba", Mensaje="Mesaje de prueba", Botones= [] }) {
        this.Dialog.classList.remove("dialog-hide");
        this.DialogTitle.innerHTML = Titulo
        this.DialogMSG.innerHTML = Mensaje
        let Self = this
        let htmlButtons = "";
        for (let i = 0; i < Botones.length; i++) {
            htmlButtons += `<input  type="button" id="btnDialog_${i}" value="${Botones[i].text}" class="dialog-btn"/>  `;
        }

        this.DialogBTS.innerHTML = htmlButtons

        for (let i = 0; i < Botones.length; i++) {
            let buttonID = this.DialogBTS.querySelector("#btnDialog_" + i);
            buttonID.addEventListener("click", () => {
                event.preventDefault()
                event.stopPropagation()
                Botones[i].callback()
                Self.Close()
                }
            )
        } 
    }
    ShowMe({ Titulo = "Titulo de prueba", Mensaje = "Mesaje de prueba", Spiner = false }) {
        this.Dialog.classList.remove("dialog-hide");
        this.DialogTitle.innerHTML = Titulo
        this.DialogMSG.innerHTML = Mensaje
        if (Spiner) {
            this.DefaultBTS.classList.add("dialog-object-hide")
            this.DialogSpiner.classList.remove("dialog-object-hide")
            this.Spiner.classList.add("dialog-spiner-animate")
        }
        else {
            this.DefaultBTS.classList.remove("dialog-object-hide")
            this.DialogSpiner.classList.add("dialog-object-hide")
            this.Spiner.classList.remove("dialog-spiner-animate")
        }
    }

    ShowQuestionAsync({ Titulo = "Titulo de prueba", Mensaje = "Mesaje de prueba" }) {
        this.ShowMe({ Titulo, Mensaje: `${Mensaje}`})
        this.Dialog.querySelector("#btnCancel").classList.remove("dialog-object-hide")

        let self = this
        return new Promise((resolve, reject) => {
            btnOK.addEventListener("click", () => {
                self.Close()
                resolve("OK")
            })
            btnCancel.addEventListener("click", () => {
                self.Close()
                resolve("CANCEL")
            })
        })
    }
    ShowInformationAsync({ Titulo = "Titulo de prueba", Mensaje = "Mesaje de prueba" }) {
        this.Dialog.querySelector("#btnCancel").classList.add("dialog-object-hide")
        this.ShowMe({ Titulo, Mensaje })
        
        let self = this
        return new Promise((resolve, reject) => {
            btnOK.addEventListener("click", () => {
                self.Close()
                resolve("OK")
            })
        })
    }

    Close() {
        this.Dialog.classList.add("dialog-hide");
        this.DialogSpiner.classList.add("dialog-object-hide")
        this.Spiner.classList.remove("dialog-spiner-animate")
    };

    ShowWaiting({ Titulo = "Título de prueba", Mensaje = "Mesaje de prueba" }) {
        this.ShowMe({ Titulo, Mensaje, Spiner:true })        
    }
    
}

const DialogForm = new ModalForm()
