const Gadget = require('../models/Gadget');
const { generateCodename, generateSuccessProbability } = require('../utils/helpers');

class GadgetController {
    async getAllGadgets(req, res) {
        try {
            const gadgets = await Gadget.findAll();
            const gadgetsWithProbability = gadgets.map(gadget => ({
                ...gadget.toJSON(),
                successProbability: `${generateSuccessProbability()}%`,
            }));
            res.status(200).json({
                message: "gadget fetched successfully",
                data: gadgetsWithProbability
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error",
            })
        }
    }

    async addGadget(req, res) {
        try {
            const { name } = req.body;
            const codename = generateCodename();
            const gadget = await Gadget.create({ name, codename });
            res.status(201).json({
                message: "gadget created successfully"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error"
            })
        }
    }

    async updateGadget(req, res) {
        try {
            const { id } = req.params;
            const gadget = await Gadget.findByPk(id);
            if (!gadget) {
                return res.status(404).json({
                    error: 'Gadget not found'
                });
            }
            await gadget.update(req.body);
            res.status(200).json({
                message: "gadget updated successfully",
                data: gadget
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error"
            })
        }
    }

    async deleteGadget(req, res) {
        try {
            const { id } = req.params;
            const gadget = await Gadget.findByPk(id);
            if (!gadget) {
                return res.status(404).json({
                    error: 'Gadget not found'
                });
            }
            await gadget.update({
                status: 'Decommissioned',
                decommissionedAt: new Date()
            });
            res.status(200).json({
                message: 'Gadget decommissioned'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error"
            })
        }
    }

    async selfDestruct(req, res) {
        try {
            const { id } = req.params;
            const gadget = await Gadget.findByPk(id);
            if (!gadget) {
                return res.status(404).json({ error: 'Gadget not found' });
            }
            const confirmationCode = Math.floor(100000 + Math.random() * 900000);
            await gadget.update({
                status: 'Destroyed'
            });
            res.status(200).json({
                message: `Self-destruct initiated. Confirmation code: ${confirmationCode}`
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error"
            })
        }
    }

    async getGadgetsByStatus(req, res) {
        try {
            const { status } = req.query;

            const filter = {};
            if (status) {
                filter.status = status;
            }
            const gadgets = await Gadget.findAll({ where: filter });

            const gadgetsWithProbability = gadgets.map(gadget => ({
                ...gadget.toJSON(),
                successProbability: `${generateSuccessProbability()}%`,
            }));
            res.status(200).json({
                message: "gadget fetched succesfully",
                data: gadgetsWithProbability
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error"
            })
        }
    }
}

module.exports = new GadgetController();