import { Response } from 'express';
import { AuthRequest } from '../types';
import { CropPlan } from '../models';

const memoryPlans = new Map<string, any>();

export const createCropPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'farmer-demo-1';
    const { cropId = 'crop-1', cropName = 'Tomato', farmSize = 5 } = req.body;

    const defaultTasks = [
      {
        id: 't-0',
        day: 0,
        title: 'Sowing & Land Preparation',
        description: 'Prepare soil beds with FYM organic manure and sow high-quality seeds.',
        category: 'sowing',
        status: 'completed',
        dueDate: 'Day 0'
      },
      {
        id: 't-15',
        day: 15,
        title: 'Irrigation & Seedling Inspection',
        description: 'Check plant health and maintain uniform moist soil bed.',
        category: 'irrigation',
        status: 'upcoming',
        dueDate: 'Day 15'
      },
      {
        id: 't-30',
        day: 30,
        title: 'Fertilizer Application',
        description: 'Apply top-dressing Urea (25kg/acre) and perform weeding.',
        category: 'fertilizer',
        status: 'upcoming',
        dueDate: 'Day 30'
      },
      {
        id: 't-45',
        day: 45,
        title: 'Pest & Disease Monitoring',
        description: 'Inspect leaves for early signs of leaf curl or fruit borer.',
        category: 'monitoring',
        status: 'upcoming',
        dueDate: 'Day 45'
      },
      {
        id: 't-60',
        day: 60,
        title: 'Flowering & Fruiting Care',
        description: 'Ensure adequate water and apply potassium support.',
        category: 'monitoring',
        status: 'upcoming',
        dueDate: 'Day 60'
      },
      {
        id: 't-90',
        day: 90,
        title: 'Harvest & Sorting',
        description: 'Harvest firm ripe tomatoes and prepare crates for local APMC market.',
        category: 'harvest',
        status: 'upcoming',
        dueDate: 'Day 90'
      }
    ];

    const newPlan = {
      id: 'plan-' + Date.now(),
      userId,
      cropId,
      cropName,
      farmSize: Number(farmSize),
      tasks: defaultTasks,
      createdAt: new Date()
    };

    try {
      const dbPlan = await CropPlan.create({
        userId,
        cropId,
        cropName,
        farmSize: Number(farmSize),
        tasks: defaultTasks
      });
      return res.status(201).json({ success: true, message: 'Crop plan generated', plan: dbPlan });
    } catch (dbErr) {
      memoryPlans.set(userId, newPlan);
      return res.status(201).json({ success: true, message: 'Crop plan generated', plan: newPlan });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCropPlans = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'farmer-demo-1';

    try {
      const plans = await CropPlan.find({ userId });
      if (plans && plans.length > 0) return res.json({ success: true, plan: plans[0] });
    } catch (dbErr) {
      // Memory fallback
    }

    let plan = memoryPlans.get(userId);
    if (!plan) {
      plan = {
        id: 'plan-demo-1',
        userId,
        cropId: 'crop-1',
        cropName: 'Tomato',
        farmSize: 5,
        tasks: [
          { id: 't-0', day: 0, title: 'Sowing & Land Prep', description: 'Prepare soil and sow seeds', category: 'sowing', status: 'completed', dueDate: 'Completed' },
          { id: 't-15', day: 15, title: 'Irrigation & Inspection', description: 'Check plant health and irrigate', category: 'irrigation', status: 'upcoming', dueDate: 'In 3 days' },
          { id: 't-30', day: 30, title: 'Fertilizer Application', description: 'Apply recommended NPK top dressing', category: 'fertilizer', status: 'upcoming', dueDate: 'In 12 days' },
          { id: 't-45', day: 45, title: 'Pest Monitoring', description: 'Check for leaf curl and pests', category: 'monitoring', status: 'upcoming', dueDate: 'In 27 days' },
          { id: 't-60', day: 60, title: 'Flowering Stage', description: 'Monitor flowering and nutrition', category: 'monitoring', status: 'upcoming', dueDate: 'In 42 days' },
          { id: 't-90', day: 90, title: 'Harvesting', description: 'Harvest mature crop', category: 'harvest', status: 'upcoming', dueDate: 'In 65 days' }
        ]
      };
      memoryPlans.set(userId, plan);
    }

    return res.json({ success: true, plan });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'farmer-demo-1';
    const { taskId } = req.params;
    const { status } = req.body;

    const plan = memoryPlans.get(userId);
    if (plan && plan.tasks) {
      const task = plan.tasks.find((t: any) => t.id === taskId);
      if (task) {
        task.status = status || (task.status === 'completed' ? 'upcoming' : 'completed');
        memoryPlans.set(userId, plan);
        return res.json({ success: true, message: 'Task status updated', task });
      }
    }

    return res.json({ success: true, message: 'Task status updated' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
