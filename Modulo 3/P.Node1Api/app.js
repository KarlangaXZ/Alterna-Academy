var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var API_URL = "http://localhost:4224/api/contacts";
// API - Obtener contactos
function getContacts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, contacts_user, tablebd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    contacts_user = _a.sent();
                    tablebd = document.getElementById('contactTable');
                    if (!tablebd) {
                        console.error('No se encontró el elemento con ID table');
                        return [2 /*return*/];
                    }
                    tablebd.innerHTML = "";
                    contacts_user.forEach(function (contact) {
                        var rows = document.createElement('tr');
                        rows.innerHTML = "\n      <td class=\"table-success\">".concat(contact.id, "</td> \n      <td class=\"table-success text-uppercase\">").concat(contact.name, "</td> \n      <td class=\"table-success\">").concat(contact.phoneNumber, "</td> \n      <td class=\"table-success text-uppercase\">").concat(contact.email, "</td>\n      <td class=\"table-dark\" >\n        <button class=\"btn btn-primary\" onclick=\"editContact(").concat(contact.id, ")\">Edit</button>\n        <button class=\"btn btn-danger\"  onclick=\"deleteContact(").concat(contact.id, ")\">Delete</button>\n      </td> \n\n    ");
                        tablebd.appendChild(rows);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Agregar contacto
function postContact(contact) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(contact),
                    })];
                case 1:
                    _a.sent();
                    getContacts();
                    return [2 /*return*/];
            }
        });
    });
}
// Eliminar contacto
function deleteContact(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(id), {
                        method: 'DELETE',
                    })];
                case 1:
                    _a.sent();
                    getContacts();
                    return [2 /*return*/];
            }
        });
    });
}
// Editar contacto
function editContact(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, contact, contactId, contactName, contactPhone, contactEmail;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(id))];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    contact = _b.sent();
                    contactId = document.getElementById('contactId');
                    contactName = document.getElementById('contactName');
                    contactPhone = document.getElementById('contactPhone');
                    contactEmail = document.getElementById('contactEmail');
                    if (!contactId || !contactName || !contactPhone || !contactEmail) {
                        console.error("No se encontraron los elementos del formulario");
                        return [2 /*return*/];
                    }
                    // Asignar los valores correctamente
                    contactId.value = ((_a = contact.id) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                    contactName.value = contact.name;
                    contactPhone.value = contact.phoneNumber;
                    contactEmail.value = contact.email;
                    return [2 /*return*/];
            }
        });
    });
}
// Manejo del formulario
var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
        var id, contact, contactIdField;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    id = (_a = document.getElementById('contactId')) === null || _a === void 0 ? void 0 : _a.value;
                    contact = {
                        name: document.getElementById('contactName').value,
                        phoneNumber: document.getElementById('contactPhone').value,
                        email: document.getElementById('contactEmail').value,
                    };
                    if (!id) return [3 /*break*/, 2];
                    // Si hay un ID, es una edición
                    return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(id), {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify(contact),
                        })];
                case 1:
                    // Si hay un ID, es una edición
                    _b.sent();
                    return [3 /*break*/, 4];
                case 2: 
                // Si no hay ID, es un nuevo contacto
                return [4 /*yield*/, postContact(contact)];
                case 3:
                    // Si no hay ID, es un nuevo contacto
                    _b.sent();
                    _b.label = 4;
                case 4:
                    // Limpiar el formulario
                    contactForm.reset();
                    contactIdField = document.getElementById('contactId');
                    if (contactIdField) {
                        contactIdField.value = ''; // Limpiar el campo ID
                    }
                    getContacts();
                    return [2 /*return*/];
            }
        });
    }); });
    // Cargar los contactos al iniciar
    getContacts();
}
