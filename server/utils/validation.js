import Joi from 'joi';

export const validateRegistration = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    parentName: Joi.string().min(2).max(50).required(),
    childrenNames: Joi.array().items(Joi.string().min(1).max(30)).optional()
  });
  
  return schema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  
  return schema.validate(data);
};

export const validateStoryGeneration = (data) => {
  const schema = Joi.object({
    prompt: Joi.string().min(10).max(500).required(),
    category: Joi.string().valid('adventure', 'fantasy', 'educational', 'friendship', 'nature', 'family').required(),
    ageRange: Joi.string().valid('5-6', '6-7', '7-8', '5-8').optional(),
    language: Joi.string().valid('en', 'fr', 'es', 'hi').optional()
  });
  
  return schema.validate(data);
};

export const validateFeedback = (data) => {
  const schema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().max(500).optional(),
    childAge: Joi.number().integer().min(5).max(8).optional(),
    tags: Joi.array().items(
      Joi.string().valid('funny', 'educational', 'exciting', 'too-easy', 'too-hard', 'loved-it', 'boring')
    ).optional()
  });
  
  return schema.validate(data);
};